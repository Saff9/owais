import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

// Terminal breadcrumb navigation
export function Crumbs({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="label-mono flex flex-wrap items-center gap-2 text-muted-foreground">
        <li className="flex items-center">
          <span className="text-amber-fg" aria-hidden>
            ❯
          </span>
        </li>
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {c.href ? (
              <Link
                href={c.href}
                className="transition-colors hover:text-foreground"
              >
                {c.label}
              </Link>
            ) : (
              <span className="text-foreground" aria-current="page">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
