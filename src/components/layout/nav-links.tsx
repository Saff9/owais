"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Page } from "@/content";
import { cn } from "@/lib/utils";

export function NavLinks({ pages }: { pages: readonly Page[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden md:block">
      <ul className="flex items-center gap-1">
        {pages.map((p) => {
          const active =
            p.href === "/" ? pathname === "/" : pathname.startsWith(p.href);
          return (
            <li key={p.href}>
              <Link
                href={p.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "label-mono rounded-md px-3 py-2 transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {p.label.toLowerCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
