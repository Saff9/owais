"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinks } from "@/components/layout/nav-links";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/system/theme-toggle";
import type { Page } from "@/content";
import { cn } from "@/lib/utils";

interface NavbarProps {
  pages: readonly Page[];
  name: string;
}

export function Navbar({ pages, name }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  const [prevPathname, setPrevPathname] = useState(pathname);

  // Reset to visible on page navigation
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setVisible(true);
  }

  useEffect(() => {
    const handleScroll = () => {
      // Keep navbar visible if mobile sheet or dialog is open
      if (
        document.body.hasAttribute("data-scroll-locked") ||
        document.querySelector('[data-slot="sheet-content"]')
      ) {
        return;
      }

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // At the top of the page: always show docked bar
      if (currentScrollY <= 20) {
        setScrolled(false);
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      setScrolled(true);

      // Scroll DOWN by >8px: hide navbar
      if (delta > 8 && currentScrollY > 60) {
        setVisible(false);
      }
      // Scroll UP by >6px: show navbar and keep it visible
      else if (delta < -6) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="h-14 w-full shrink-0" aria-hidden="true" />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full transition-all duration-200",
          visible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div
          className={cn(
            "w-full border-b transition-all duration-200",
            scrolled
              ? "border-border bg-background/95 shadow-md shadow-black/20 backdrop-blur-md"
              : "border-border/60 bg-background/80 backdrop-blur-md"
          )}
        >
          <div className="site-container flex h-14 items-center justify-between">
            <Link
              href="/"
              className="font-mono text-sm font-semibold tracking-tight transition-opacity hover:opacity-80 shrink-0 mr-4"
              aria-label={`${name}.dev — home`}
            >
              <span className="text-amber-fg">❯</span> {name}
              <span className="text-muted-foreground">.dev</span>
            </Link>

            <NavLinks pages={pages} />

            <div className="flex items-center gap-2 shrink-0 ml-4">
              <ThemeToggle />
              <MobileNav pages={pages} name={name} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
