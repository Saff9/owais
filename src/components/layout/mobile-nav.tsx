"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderGit2,
  GitBranch,
  Home,
  Mail,
  Menu,
  Newspaper,
  User,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Page } from "@/content";
import { cn } from "@/lib/utils";

const ROUTE_ICONS: Record<string, LucideIcon> = {
  "/": Home,
  "/about": User,
  "/projects": FolderGit2,
  "/blog": Newspaper,
  "/experience": GitBranch,
  "/contact": Mail,
};

interface MobileNavProps {
  pages: readonly Page[];
  /** Brand shown in the drawer header, e.g. "Owais". */
  name: string;
}

export function MobileNav({ pages, name }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links: readonly Page[] = [
    { href: "/", label: "Home" },
    ...pages,
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground md:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 p-0">
        <SheetHeader className="border-b border-border p-4">
          <SheetTitle className="font-mono text-left text-sm">
            <span className="text-amber-fg">❯</span> {name}
            <span className="text-muted-foreground">.dev</span>
          </SheetTitle>
          <SheetDescription className="sr-only">Mobile navigation menu</SheetDescription>
        </SheetHeader>

        <nav aria-label="Primary" className="p-2">
          <ul>
            {links.map((p) => {
              const active =
                p.href === "/" ? pathname === "/" : pathname.startsWith(p.href);
              const Icon = ROUTE_ICONS[p.href] ?? Home;
              return (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-3 text-left font-mono text-sm transition-colors",
                      active
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                    {p.label.toLowerCase()}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
