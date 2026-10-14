import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PagerItem {
  href: string;
  label: string;
}

interface PagerNavProps {
  prev?: PagerItem;
  next?: PagerItem;
  navLabel?: string;
}

// Previous/next pagination navigation
export function PagerNav({ prev, next, navLabel }: PagerNavProps) {
  return (
    <nav
      aria-label={navLabel}
      className="grid gap-4 border-t border-border pt-10 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-ring"
        >
          <ArrowLeft
            className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-1"
            aria-hidden
          />
          <span className="min-w-0">
            <span className="label-mono block text-muted-foreground">
              previous
            </span>
            <span className="mt-1 block truncate font-mono text-sm font-semibold">
              <span className="text-amber-fg" aria-hidden>
                ./
              </span>
              {prev.label}
            </span>
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}

      {next && (
        <Link
          href={next.href}
          className="group flex items-center justify-end gap-4 rounded-xl border border-border bg-card p-5 text-right transition-all hover:-translate-y-0.5 hover:border-ring"
        >
          <span className="min-w-0">
            <span className="label-mono block text-muted-foreground">
              next
            </span>
            <span className="mt-1 block truncate font-mono text-sm font-semibold">
              <span className="text-amber-fg" aria-hidden>
                ./
              </span>
              {next.label}
            </span>
          </span>
          <ArrowRight
            className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      )}
    </nav>
  );
}
