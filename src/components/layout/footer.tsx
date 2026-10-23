import Link from "next/link";
import { TechIcon } from "@/components/tech-icon";
import { pages, person, socials } from "@/content";

export function Footer() {
  const year = new Date().getFullYear();
  const sitemap = [{ href: "/", label: "home" }, ...pages.map((p) => ({ href: p.href, label: p.label.toLowerCase() }))];

  return (
    <footer className="mt-auto border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="font-mono text-sm font-semibold">
            <span className="text-amber-fg">❯</span> {person.firstName}
            <span className="text-muted-foreground">.dev</span>
          </p>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-4">
              {sitemap.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="label-mono text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-1" aria-label="Social profiles">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} — ${s.handle}`}
                  className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                >
                  <TechIcon name={s.label} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 font-mono text-[0.65rem] text-muted-foreground sm:flex-row">
          <p>© {year} {person.name} · All rights reserved</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              privacy
            </Link>
            <span aria-hidden>·</span>
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              terms
            </Link>
            <span aria-hidden>·</span>
            <a
              href="/rss.xml"
              className="transition-colors hover:text-foreground"
              aria-label="RSS feed"
            >
              rss
            </a>
            <span aria-hidden>·</span>
            <span aria-hidden className="text-amber-fg">
              ❯
            </span>
            <span>eof</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
