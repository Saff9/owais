import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CopyEmail } from "@/components/shared/copy-email";
import { PromptLine } from "@/components/shared/prompt-line";
import { person } from "@/content";

export function CtaBand() {
  return (
    <section aria-labelledby="cta-heading" className="dot-grid">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 section-y">
        <div className="card-panel p-8 text-center sm:p-14">
          <PromptLine command="./start-a-conversation.sh" className="text-muted-foreground" />

          <h2
            id="cta-heading"
            className="text-section mx-auto mt-6 max-w-2xl font-semibold tracking-tight text-balance"
          >
            Let&apos;s build something <span className="text-amber-fg">worth deploying.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            The inbox is open for product work, consulting, or a good
            argument about monorepos.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="font-mono text-sm">
              <Link href="/contact">
                <span className="text-amber-fg" aria-hidden>
                  ❯
                </span>{" "}
                get in touch
              </Link>
            </Button>
            <CopyEmail variant="button" email={person.email} />
          </div>
        </div>
      </div>
    </section>
  );
}
