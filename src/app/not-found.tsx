import Link from "next/link";
import { Button } from "@/components/ui/button";
import { pages } from "@/content";

export const metadata = { title: "404 — not found" };

export default function NotFound() {
  return (
    <div className="dot-grid flex flex-1 flex-col items-center justify-center px-4 py-24">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 font-mono">
        <p className="text-sm text-muted-foreground">
          <span className="text-amber-fg">$</span> curl -I /this-page
        </p>
        <p className="mt-2 text-sm text-chart-3">HTTP/2 404</p>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This route shipped to the wrong branch. The rest of the site is very
          much alive:
        </p>
        <ul className="mt-5 space-y-1.5 text-sm">
          {pages.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="flex items-baseline gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="text-amber-fg" aria-hidden>
                  ❯
                </span>
                {p.label.toLowerCase()}
              </Link>
            </li>
          ))}
        </ul>
        <Button asChild className="mt-6 font-mono text-sm">
          <Link href="/">cd ~</Link>
        </Button>
      </div>
    </div>
  );
}
