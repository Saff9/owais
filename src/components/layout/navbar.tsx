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
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
          scrolled ? "pt-3 px-4 pointer-events-none" : "w-full pointer-events-auto",
          visible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div
          className={cn(
            "transition-all duration-300 ease-out flex items-center justify-between pointer-events-auto",
            scrolled
              ? "mx-auto max-w-3xl h-12 rounded-full border border-border bg-background/90 px-4 sm:px-6 shadow-xl backdrop-blur-md ring-1 ring-border/50"
              : "mx-auto max-w-6xl h-14 w-full border-b border-border bg-background/85 px-4 sm:px-6 backdrop-blur-md"
          )}
        >
          <Link
            href="/"
            className="font-mono text-sm font-semibold tracking-tight transition-opacity hover:opacity-80"
            aria-label={`${name}.dev — home`}
          >
            <span className="text-amber-fg">❯</span> {name}
            <span className="text-muted-foreground">.dev</span>
          </Link>

          <NavLinks pages={pages} />

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <MobileNav pages={pages} name={name} />
          </div>
        </div>
      </header>
    </>
  );
}
