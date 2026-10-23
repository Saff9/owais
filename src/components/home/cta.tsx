import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CopyEmail } from "@/components/shared/copy-email";
import { PromptLine } from "@/components/shared/prompt-line";
import { TechIcon } from "@/components/tech-icon";
import { person } from "@/content";

export function CtaBand() {
  const telegramHref = person.telegram || "https://t.me/Kanferneo";

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
            Looking for web apps, backend APIs, CMS panels, or complete MVP delivery?
            Reach out via Telegram or drop a line in the inbox.
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
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#229ED9]/50 font-mono text-sm hover:border-[#229ED9] hover:bg-[#229ED9]/10"
            >
              <a
                href={telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <TechIcon name="Telegram" className="size-4" />
                chat on telegram
              </a>
            </Button>
            <CopyEmail variant="button" email={person.email} />
          </div>
        </div>
      </div>
    </section>
  );
}
