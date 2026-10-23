import Link from "next/link";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { StackList, TechIcon } from "@/components/tech-icon";
import type { Project } from "@/content";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const p = project;

  return (
    <article className="group h-full">
      <Link
        href={`/projects/${p.name}`}
        aria-label={`${p.name} — ${p.tagline}`}
        className={`card-panel lift flex h-full flex-col p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:p-6 ${
          featured ? "sm:p-7" : ""
        }`}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <span
            className="flex size-10 items-center justify-center rounded-lg border border-border bg-background transition-colors group-hover:border-ring"
            aria-hidden
          >
            <TechIcon name={p.language} colored className="size-5" />
          </span>
          <span className="label-mono flex items-center gap-2 text-muted-foreground">
            {p.year}
            <ArrowUpRight
              className="size-3.5 -translate-x-1 translate-y-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
              aria-hidden
            />
          </span>
        </div>

        <h3 className="font-mono text-lg font-semibold tracking-tight">
          <span className="text-amber-fg transition-opacity group-hover:opacity-70" aria-hidden>
            ./
          </span>
          {p.name}
        </h3>
        {p.category && (
          <span className="mt-1 block font-mono text-[0.68rem] text-chart-2 font-medium">
            {p.category}
          </span>
        )}
        <p className="mt-1.5 text-sm text-muted-foreground">{p.tagline}</p>

        {featured && (
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {p.description}
          </p>
        )}

        <div className="mt-auto pt-5">
          <StackList stack={p.stack} className="mb-4" colored={false} />
          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="flex items-center gap-1.5 font-mono text-[0.7rem] text-muted-foreground">
              <FolderGit2 className="size-3.5" aria-hidden />
              case study
            </span>
            <span className="label-mono text-amber-fg">
              open →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
