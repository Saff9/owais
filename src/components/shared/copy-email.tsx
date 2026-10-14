"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyEmailProps {
  email: string;
  variant?: "inline" | "button";
  className?: string;
}

export function CopyEmail({ email, variant = "inline", className }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast(`Copied — ${email}`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast("Clipboard blocked — the email is printed nearby");
    }
  };

  if (variant === "button") {
    return (
      <Button
        size="lg"
        variant="outline"
        onClick={copy}
        className={cn(
          "border-muted-foreground/30 font-mono text-sm hover:border-ring hover:bg-accent",
          className
        )}
        aria-label={`Copy email address ${email}`}
      >
        {copied ? (
          <Check className="size-4 text-chart-2" aria-hidden />
        ) : (
          <Copy className="size-4" aria-hidden />
        )}
        {email}
      </Button>
    );
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "label-mono flex items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
      aria-label={`Copy email address ${email}`}
    >
      {copied ? (
        <Check className="size-3.5 text-chart-2" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
      {email}
    </button>
  );
}
