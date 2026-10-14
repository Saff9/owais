"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Check, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CopyEmail } from "@/components/shared/copy-email";
import { PromptLine } from "@/components/shared/prompt-line";
import { fieldMono } from "@/lib/ui-classes";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please share your name (2+ characters).")
    .max(100, "Name must be under 100 characters."),
  email: z
    .string()
    .trim()
    .email("That email doesn't look right.")
    .max(150, "Email is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Give me at least 10 characters — context helps.")
    .max(2000, "Please keep it under 2000 characters."),
});
type ContactValues = z.infer<typeof contactSchema>;

interface ApiResponse {
  ok: boolean;
  error?: string;
}

const EMPTY: ContactValues = { name: "", email: "", message: "" };

const SHORT_FIELDS: readonly {
  /** react-hook-form field key — also the zod schema key. */
  name: "name" | "email";
  /** DOM id — doubles as the `${id}-error` suffix for aria-describedby. */
  id: string;
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
}[] = [
  {
    name: "name",
    id: "contact-name",
    label: "name",
    type: "text",
    autoComplete: "name",
    placeholder: "Ada Lovelace",
  },
  {
    name: "email",
    id: "contact-email",
    label: "email",
    type: "email",
    autoComplete: "email",
    placeholder: "you@company.com",
  },
];

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="label-mono mb-2 block text-muted-foreground">
      {children} <span className="text-amber-fg" aria-hidden>*</span>
    </label>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} role="alert" className="mt-2 font-mono text-xs text-destructive">
      {message}
    </p>
  );
}

function FormSuccess({ onReset }: { onReset: () => void }) {
  return (
    <div
      role="status"
      className="card-panel flex flex-col items-center justify-center p-10 text-center"
    >
      <span className="mb-4 flex size-12 items-center justify-center rounded-full border border-border bg-background">
        <Check className="size-5 text-chart-2" aria-hidden />
      </span>
      <h2 className="font-mono text-lg font-semibold">
        <span className="text-chart-2">✓</span> Message sent
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Thanks for reaching out — I read everything personally and usually
        reply within 48 hours.
      </p>
      <Button
        variant="outline"
        size="sm"
        className="mt-6 font-mono text-xs"
        onClick={onReset}
      >
        send another
      </Button>
    </div>
  );
}

interface ContactFormProps {
  /** Flows from the server page to the inline copy-email — no content imports on the client. */
  email: string;
}

export function ContactForm({ email }: ContactFormProps) {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: EMPTY,
  });

  const onSubmit = async (values: ContactValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: ApiResponse = await res.json().catch(() => ({ ok: false }));

      if (!res.ok || !data.ok) {
        setServerError(data.error ?? "Something broke on my side — try email instead?");
        return;
      }
      setSent(true);
      toast("Message sent — I'll reply within 48h");
    } catch {
      setServerError("Network hiccup — check your connection and retry.");
    }
  };

  if (sent) {
    return <FormSuccess onReset={() => setSent(false)} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="card-panel p-6 sm:p-8"
    >
      <PromptLine command="./send-message.sh" className="mb-6" />

      <div className="grid gap-5 sm:grid-cols-2">
        {SHORT_FIELDS.map((f) => {
          const error = errors[f.name]?.message;
          return (
            <div key={f.id}>
              <FieldLabel htmlFor={f.id}>{f.label}</FieldLabel>
              <Input
                id={f.id}
                type={f.type}
                autoComplete={f.autoComplete}
                placeholder={f.placeholder}
                aria-invalid={error ? "true" : undefined}
                aria-describedby={error ? `${f.id}-error` : undefined}
                className={cn(fieldMono, error && "border-destructive")}
                {...register(f.name)}
              />
              {error && <FieldError id={`${f.id}-error`} message={error} />}
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <FieldLabel htmlFor="contact-message">message</FieldLabel>
        <Textarea
          id="contact-message"
          rows={5}
          placeholder="What are we building? A role, a project, or just want to argue about tabs vs spaces…"
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(fieldMono, "resize-y", errors.message && "border-destructive")}
          {...register("message")}
        />
        {errors.message?.message && (
          <FieldError id="contact-message-error" message={errors.message.message} />
        )}
      </div>

      {serverError && (
        <div
          role="alert"
          className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 p-3.5 font-mono text-xs text-destructive space-y-2"
        >
          <p>
            <span aria-hidden>✗ </span>
            {serverError}
          </p>
          <a
            href={`mailto:${email}?subject=${encodeURIComponent(`Message from ${getValues("name") || "portfolio visitor"}`)}&body=${encodeURIComponent(getValues("message") || "")}`}
            className="inline-flex items-center gap-1 font-semibold text-foreground underline hover:text-amber-fg"
          >
            Send directly via email client →
          </a>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
        <CopyEmail email={email} />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="font-mono text-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden /> sending…
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden /> send message
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
