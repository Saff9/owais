"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  faqs: readonly FaqItem[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  // All items closed initially (empty array or set)
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggle = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="mt-8 space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIndices.includes(idx);

        return (
          <div
            key={faq.q}
            className={cn(
              "overflow-hidden rounded-xl border border-border bg-card transition-colors",
              isOpen && "border-amber-fg/40 bg-card/90"
            )}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 p-5 text-left font-mono text-sm font-semibold text-foreground transition-colors hover:text-amber-fg sm:p-6"
            >
              <span className="flex items-center gap-3">
                <span className="text-xs text-amber-fg font-bold" aria-hidden>
                  {isOpen ? "▼" : "▶"}
                </span>
                <span>{faq.q}</span>
              </span>
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180 text-amber-fg"
                )}
                aria-hidden
              />
            </button>

            {isOpen && (
              <div className="border-t border-border/60 px-5 pb-5 pt-3 sm:px-6 sm:pb-6 text-xs sm:text-sm leading-relaxed text-muted-foreground animate-in fade-in-50 duration-200">
                <p>{faq.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
