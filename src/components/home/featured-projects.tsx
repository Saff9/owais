import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/content";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section aria-labelledby="featured-heading" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 section-y">
        <SectionHeading
          label="selected work"
          title="Things I've shipped"
          id="featured-heading"
        />

        <div className={`grid gap-6 ${featured.length === 1 ? "max-w-2xl" : featured.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
          {featured.map((p) => (
            <ProjectCard key={p.name} project={p} featured />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="label-mono group inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-muted-foreground lift hover:text-foreground"
          >
            all projects ({projects.length})
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
