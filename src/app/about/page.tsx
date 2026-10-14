import type { Metadata } from "next";
import Link from "next/link";
import {
  Accessibility,
  ArrowUpRight,
  BookOpen,
  Gauge,
  Mountain,
  Rocket,
  FileCode2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { SkillsTree } from "@/components/about/skills-tree";
import { TechIcon } from "@/components/tech-icon";
import { beyondCode, currently, person, principles, skillsNote, socials } from "@/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "The person behind the commits — a software engineer and web developer who lives at the seam between design and engineering.",
  keywords: [
    "about",
    "software engineer",
    "full-stack web developer",
    "UI/UX",
    "design systems",
    "web performance",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About | ${person.name}`,
    description:
      "The person behind the commits — a software engineer and web developer who lives at the seam between design and engineering.",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: `About | ${person.name}`,
    description:
      "The person behind the commits — a software engineer and web developer who lives at the seam between design and engineering.",
  },
};

const PRINCIPLE_ICONS: Record<string, LucideIcon> = {
  ship: Rocket,
  types: FileCode2,
  performance: Gauge,
  accessibility: Accessibility,
};

const quickFacts: readonly (readonly [string, string])[] = [
  ["name", person.name],
  ["role", person.role],
  ["timezone", person.timezone],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="about"
        title="The human behind the commits"
        description="3+ years of shipping for startups and studios — with a bias for systems that stay debuggable long after the launch dopamine fades."
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 section-y-sm">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            {person.summary.map((p, i) => (
              <p
                key={i}
                className="mb-5 max-w-2xl text-pretty leading-relaxed text-muted-foreground"
              >
                {i === 0 ? (
                  <>
                    <span className="float-left mr-2 font-mono text-5xl font-bold leading-[0.8] text-amber-fg">
                      {p.charAt(0)}
                    </span>
                    {p.slice(1)}
                  </>
                ) : (
                  p
                )}
              </p>
            ))}

            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-amber-fg">{"// currently"}</span> building things
              that make the web feel less like homework and more like craft.
            </p>
          </div>

          <aside
            aria-label="Quick facts"
            className="h-fit rounded-xl border border-border bg-card p-6"
          >
            <h2 className="label-mono mb-4 flex items-center gap-2 text-muted-foreground">
              <Sparkles className="size-3.5 text-amber-fg" aria-hidden />
              quick facts
            </h2>
            <dl className="space-y-3 font-mono text-sm">
              {quickFacts.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-muted-foreground">email</dt>
                <dd>{person.email}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-t border-border pt-3">
                <dt className="text-muted-foreground">socials</dt>
                <dd className="flex items-center gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} — ${s.handle}`}
                      className="text-muted-foreground transition-colors hover:text-amber-fg"
                    >
                      <TechIcon name={s.label} className="size-4" />
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="principles-heading"
        className="border-y border-border bg-muted/40"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 section-y-sm">
          <h2
            id="principles-heading"
            className="label-mono mb-3 flex items-center gap-3 text-muted-foreground"
          >
            <span className="text-amber-fg" aria-hidden>
              $
            </span>
            <span aria-hidden className="h-px w-8 bg-border" />
            how I work
          </h2>
          <h3 className="mb-10 text-section font-semibold tracking-tight">
            Principles I don&apos;t negotiate on
          </h3>

          <div className="grid gap-6 sm:grid-cols-2">
            {principles.map((p) => {
              const Icon = PRINCIPLE_ICONS[p.icon] ?? Sparkles;
              return (
                <article
                  key={p.title}
                  className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-ring"
                >
                  <span
                    className="mb-4 flex size-10 items-center justify-center rounded-lg border border-border bg-background text-amber-fg"
                    aria-hidden
                  >
                    <Icon className="size-5" />
                  </span>
                  <h4 className="text-lg font-semibold tracking-tight">{p.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="skills-heading" className="mx-auto max-w-6xl px-4 sm:px-6 section-y-sm">
        <h2
          id="skills-heading"
          className="label-mono mb-3 flex items-center gap-3 text-muted-foreground"
        >
          <span className="text-amber-fg" aria-hidden>
            $
          </span>
          <span aria-hidden className="h-px w-8 bg-border" />
          skills
        </h2>
        <h3 className="mb-10 text-section font-semibold tracking-tight">
          The stack, filed properly
        </h3>

        <SkillsTree />

        <p className="label-mono mt-6 text-center text-muted-foreground">
          {skillsNote}
        </p>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 section-y-sm lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <h2 className="label-mono mb-6 flex items-center gap-2 text-muted-foreground">
              <BookOpen className="size-3.5 text-amber-fg" aria-hidden />
              currently
            </h2>
            <dl className="space-y-4 font-mono text-sm">
              {[
                ["learning", currently.learning],
                ["building", currently.building],
                ["reading", currently.reading],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-wrap items-baseline gap-x-4">
                  <dt className="text-amber-fg">{k}</dt>
                  <dd className="text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <h2 className="label-mono mb-6 flex items-center gap-2 text-muted-foreground">
              <Mountain className="size-3.5 text-amber-fg" aria-hidden />
              beyond the terminal
            </h2>
            <ul className="space-y-3">
              {beyondCode.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="size-1.5 shrink-0 rounded-full bg-amber-fg/70" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:grid-cols-2 sm:px-6">
          <Link
            href="/blog"
            className="label-mono group flex items-center justify-between rounded-lg border border-border bg-card px-5 py-4 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-ring hover:text-foreground"
          >
            <span className="font-mono text-sm">
              <span className="text-amber-fg">$</span> cd ~/blog
            </span>
            <ArrowUpRight
              className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
          <Link
            href="/experience"
            className="label-mono group flex items-center justify-between rounded-lg border border-border bg-card px-5 py-4 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-ring hover:text-foreground"
          >
            <span className="font-mono text-sm">
              <span className="text-amber-fg">$</span> git log --career
            </span>
            <ArrowUpRight
              className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </section>
    </>
  );
}
