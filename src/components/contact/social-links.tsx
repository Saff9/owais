import { ArrowUpRight } from "lucide-react";
import { TechIcon } from "@/components/tech-icon";
import { socials } from "@/content";

export function SocialLinks() {
  return (
    <ul className="space-y-3">
      {socials.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center justify-between rounded-lg border border-border bg-card px-4 py-3.5 text-left lift"
            aria-label={`${s.label} — ${s.handle}`}
          >
            <span className="flex items-center gap-3">
              <span
                className="flex size-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors group-hover:text-foreground"
                aria-hidden
              >
                <TechIcon name={s.label} className="size-4" />
              </span>
              <span>
                <span className="label-mono block text-muted-foreground group-hover:text-foreground">
                  {s.label.toLowerCase()}
                </span>
                <span className="mt-0.5 block font-mono text-sm text-foreground">
                  {s.handle}
                </span>
              </span>
            </span>
            <ArrowUpRight
              className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
              aria-hidden
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
