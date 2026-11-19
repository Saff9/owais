import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Lesson } from "@/lib/courses";
import { cn } from "@/lib/utils";

export function LessonSyllabus({
  lessons,
  courseSlug,
}: {
  lessons: Lesson[];
  courseSlug: string;
}) {
  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      {lessons.map((lesson, idx) => {
        const isReady = lesson.status !== "upcoming";
        const cleanTitle = lesson.title.replace(/^\d+\.\s*/, "");
        const num = (idx + 1).toString().padStart(2, "0");

        return (
          <Link
            key={lesson.slug}
            href={`/courses/${courseSlug}/${lesson.slug}`}
            className={cn(
              "group flex items-center justify-between gap-4 px-4 py-3.5 transition-all",
              isReady ? "hover:bg-amber-500/[0.04]" : "hover:bg-muted/30"
            )}
          >
            {/* Number and Title */}
            <div className="flex items-center gap-3.5 min-w-0">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-md font-mono text-xs font-semibold border transition-colors",
                  isReady
                    ? "border-amber-fg/40 bg-amber-500/10 text-amber-fg group-hover:border-amber-fg"
                    : "border-border bg-muted/50 text-muted-foreground/70"
                )}
              >
                {num}
              </span>

              <span
                className={cn(
                  "truncate text-sm transition-colors",
                  isReady
                    ? "font-semibold text-foreground group-hover:text-amber-fg"
                    : "font-medium text-foreground/80 group-hover:text-foreground"
                )}
              >
                {cleanTitle}
              </span>
            </div>

            {/* Status / Duration / Action */}
            <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
              {isReady ? (
                <>
                  <span className="flex items-center gap-1 text-[0.72rem] text-muted-foreground">
                    <Clock className="size-3 text-amber-fg" />
                    {lesson.duration.split("·")[0]?.trim()}
                  </span>

                  <span className="flex size-6 items-center justify-center rounded-full bg-amber-500/10 text-amber-fg border border-amber-fg/20 transition-transform group-hover:translate-x-0.5 group-hover:bg-amber-fg group-hover:text-background">
                    <ArrowRight className="size-3" />
                  </span>
                </>
              ) : (
                <>
                  <span className="rounded bg-muted/60 px-2 py-0.5 text-[0.65rem] text-muted-foreground/60 border border-border/60">
                    Soon
                  </span>

                  <span className="size-6 flex items-center justify-center text-muted-foreground/30 transition-transform group-hover:translate-x-0.5 group-hover:text-muted-foreground/60">
                    <ArrowRight className="size-3" />
                  </span>
                </>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
