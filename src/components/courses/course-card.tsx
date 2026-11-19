import Link from "next/link";
import { Layers, ArrowUpRight } from "lucide-react";
import type { Course } from "@/lib/courses";

const TRACK_LABELS: Record<Course["track"], { label: string; color: string }> = {
  frontend: { label: "Frontend", color: "bg-amber-500/10 text-amber-fg border-amber-fg/30" },
  backend: { label: "Backend", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
  fullstack: { label: "Fullstack", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" },
  "system-design": { label: "System Design", color: "bg-violet-500/10 text-violet-400 border-violet-500/30" },
};

export function CourseCard({ course }: { course: Course }) {
  const trackInfo = TRACK_LABELS[course.track] ?? {
    label: course.track,
    color: "bg-muted text-muted-foreground border-border",
  };

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-fg/40 hover:shadow-lg hover:shadow-black/20">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span
            className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.7rem] font-medium ${trackInfo.color}`}
          >
            {trackInfo.label}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-amber-fg">
          <Link href={`/courses/${course.slug}`}>
            {course.title}
          </Link>
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {course.description}
        </p>
      </div>

      <div className="mt-6 border-t border-border/70 pt-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-mono">
              <Layers className="size-3.5 text-muted-foreground" />
              {course.lessons.length} {course.lessons.length === 1 ? "lesson" : "lessons"}
            </span>
          </div>

          <Link
            href={`/courses/${course.slug}`}
            className="flex items-center gap-1 font-mono text-xs text-amber-fg transition-transform group-hover:translate-x-0.5"
            aria-label={`View course: ${course.title}`}
          >
            Start <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
