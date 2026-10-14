import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCard } from "@/components/projects/project-card";
import { person, projects } from "@/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Web development case studies — SaaS platforms, developer tools and design systems, each with the full engineering write-up.",
  keywords: [
    "web development projects",
    "software engineering case studies",
    "UI/UX design",
    "design systems",
    "Next.js",
    "React",
  ],
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects | ${person.name}`,
    description:
      "Web development case studies — SaaS platforms, developer tools and design systems, each with the full engineering write-up.",
    url: "/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects | ${person.name}`,
    description:
      "Web development case studies — SaaS platforms, developer tools and design systems, each with the full engineering write-up.",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        label="projects"
        title="Selected work"
        description="A working archive: production platforms, developer tools and a few client-side oddities. Open a case study for the details."
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 section-y-sm">
        <div className={`grid gap-6 ${projects.length === 1 ? "max-w-2xl" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
          {projects.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </section>
    </>
  );
}
