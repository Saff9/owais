import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCard } from "@/components/projects/project-card";
import { person, projects } from "@/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Real-world web development case studies — tour platforms, admin dashboards, REST APIs, and e-commerce storefronts built with Next.js, React, FastAPI and TypeScript.",
  keywords: [
    "web development projects India",
    "software engineering case studies",
    "Next.js projects",
    "React projects",
    "FastAPI projects",
    "full-stack developer portfolio",
    "web developer portfolio India",
    "web developer Srinagar portfolio",
    "admin dashboard development",
    "e-commerce web development",
  ],
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    title: `Projects — ${person.name}'s Work`,
    description:
      "Real-world engineering case studies: tour platforms, admin dashboards, REST APIs, and e-commerce storefronts.",
    url: "/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects — ${person.name}'s Work`,
    description:
      "Real-world engineering case studies: tour platforms, admin dashboards, REST APIs, and e-commerce storefronts.",
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

      <section className="site-container section-y-sm">
        <div className={`grid gap-6 ${projects.length === 1 ? "max-w-2xl" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
          {projects.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </section>
    </>
  );
}
