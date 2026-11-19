"use client";

import Link from "next/link";
import { BookOpen, ChevronUp, CheckCircle2 } from "lucide-react";
import type { Lesson } from "@/lib/courses";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function CourseModuleNavigator({
  lessons,
  courseSlug,
  currentLessonSlug,
}: {
  lessons: Lesson[];
  courseSlug: string;
  currentLessonSlug: string;
}) {
  const currentIndex = lessons.findIndex((l) => l.slug === currentLessonSlug);
  const currentNumber = (currentIndex + 1).toString().padStart(2, "0");
  const totalCount = lessons.length.toString().padStart(2, "0");

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <Sheet>
        <SheetTrigger asChild>
          <button
            type="button"
            className="group flex items-center gap-1.5 rounded-full border border-border/80 bg-card/90 px-2.5 py-1.5 font-mono text-[0.68rem] text-foreground shadow-md backdrop-blur-md transition-all hover:border-amber-fg/70 hover:bg-card hover:text-amber-fg hover:shadow-lg"
            aria-label="Open course syllabus"
          >
            <BookOpen className="size-3 text-amber-fg group-hover:rotate-6 transition-transform" />
            <span className="font-semibold text-amber-fg">
              {currentNumber}
              <span className="text-muted-foreground/70 font-normal">/{totalCount}</span>
            </span>
            <span className="hidden sm:inline text-muted-foreground/80 font-normal">
              Modules
            </span>
            <ChevronUp className="size-2.5 text-muted-foreground/70 group-hover:text-amber-fg" />
          </button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[85vw] max-w-[380px] p-0 font-mono">
          <SheetHeader className="border-b border-border p-4 bg-muted/40">
            <SheetTitle className="flex items-center justify-between text-xs font-semibold text-foreground">
              <span className="flex items-center gap-2">
                <BookOpen className="size-3.5 text-amber-fg" />
                <span>Course Modules</span>
              </span>
              <span className="rounded bg-background px-2 py-0.5 text-[0.65rem] text-muted-foreground border border-border">
                {totalCount} Parts
              </span>
            </SheetTitle>
          </SheetHeader>

          <div className="max-h-[calc(100vh-5rem)] overflow-y-auto p-2.5 space-y-1 text-xs">
            {lessons.map((l, idx) => {
              const isCurrent = l.slug === currentLessonSlug;
              const displayTitle = l.title.replace(/^\d+\.\s*/, "");
              return (
                <Link
                  key={l.slug}
                  href={`/courses/${courseSlug}/${l.slug}`}
                  className={cn(
                    "flex items-center justify-between gap-2.5 rounded-lg px-2.5 py-2 transition-colors",
                    isCurrent
                      ? "bg-amber-500/15 text-amber-fg font-semibold border border-amber-fg/30"
                      : "text-muted-foreground hover:bg-card hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={cn(
                        "w-5 shrink-0 text-left text-[0.7rem]",
                        isCurrent ? "font-bold text-amber-fg" : "text-muted-foreground/60"
                      )}
                    >
                      {(idx + 1).toString().padStart(2, "0")}.
                    </span>
                    <span className="truncate text-[0.75rem]">{displayTitle}</span>
                  </div>

                  <div className="shrink-0">
                    {isCurrent ? (
                      <span className="size-1.5 rounded-full bg-amber-fg" />
                    ) : l.status === "upcoming" ? (
                      <span className="text-[0.6rem] text-muted-foreground/40 font-mono">
                        Soon
                      </span>
                    ) : (
                      <CheckCircle2 className="size-3 text-emerald-400/80" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
