import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { GitLog } from "@/components/experience/git-log";
import { experience, person } from "@/content";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Career progression and technical milestones from web fundamentals to full-stack production — rendered as a git log.",
  keywords: [
    "software engineer experience",
    "web developer career",
    "full-stack engineer",
    "product engineering",
  ],
  alternates: { canonical: "/experience" },
  openGraph: {
    title: `Experience | ${person.name}`,
    description:
      "Career progression and technical milestones from web fundamentals to full-stack production — rendered as a git log.",
    url: "/experience",
  },
  twitter: {
    card: "summary_large_image",
    title: `Experience | ${person.name}`,
    description:
      "Career progression and technical milestones from web fundamentals to full-stack production — rendered as a git log.",
  },
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        label="experience"
        title="Career milestones"
        description="Roles, skills, and shipped outcomes, newest first. Milestones mark the progression from fundamentals to production."
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 section-y-sm">
        <GitLog />
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 section-y-sm">
          <h2 className="label-mono mb-6 text-muted-foreground">shortlog</h2>
          <dl className="grid gap-6 sm:grid-cols-3">
            {[
              ["milestones", `${experience.length} milestones`, "2023 → now"],
              ["focus", "full-stack", "Next.js · TypeScript · APIs"],
              ["reverts", "0", "production deployments"],
            ].map(([label, value, note]) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-card p-6"
              >
                <dt className="label-mono text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-2 font-mono text-2xl font-semibold">{value}</dd>
                <dd className="mt-1 font-mono text-[0.65rem] text-muted-foreground">
                  {note}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
