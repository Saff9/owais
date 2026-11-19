import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

// Terminal breadcrumb navigation
export function Crumbs({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="label-mono flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-muted-foreground">
        <li className="flex items-center shrink-0">
          <span className="text-amber-fg" aria-hidden>
            ❯
          </span>
        </li>
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            {i > 0 && <span aria-hidden className="shrink-0 text-muted-foreground/40">/</span>}
            {c.href ? (
              <Link
                href={c.href}
                className="shrink-0 transition-colors hover:text-foreground"
              >
                {c.label}
              </Link>
            ) : (
              <span className="truncate max-w-[160px] sm:max-w-[280px] md:max-w-none text-foreground font-medium" aria-current="page">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
