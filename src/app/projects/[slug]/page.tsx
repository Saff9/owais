import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Check, FileCode2 } from "lucide-react";
import { Crumbs } from "@/components/layout/crumbs";
import { PagerNav } from "@/components/shared/pager-nav";
import { StackList, TechIcon } from "@/components/tech-icon";
import { Button } from "@/components/ui/button";
import { getProject, person, projects } from "@/content";
import { breadcrumbJsonLd } from "@/lib/schema";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project not found" };
  const pageUrl = `/projects/${p.name}`;
  return {
    title: `${p.name} — Case Study`,
    description: `${p.tagline} — ${p.description}`,
    keywords: [
      p.name,
      p.category || "web development",
      p.language,
      ...p.stack,
      "software engineer portfolio",
      "case study",
      "web developer Srinagar",
      "full-stack developer India",
    ],
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${person.name} — ${p.name} Case Study`,
      description: p.tagline,
      url: pageUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: `${person.name} — ${p.name} Case Study`,
      description: p.tagline,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const index = projects.findIndex((x) => x.name === p.name);
  const otherProjects = projects.filter((x) => x.name !== p.name);
  const prev = otherProjects.length > 0 ? projects[(index - 1 + projects.length) % projects.length] : undefined;
  const next = otherProjects.length > 0 ? projects[(index + 1) % projects.length] : undefined;

  const crumbs = breadcrumbJsonLd([
    { label: "~", href: "/" },
    { label: "projects", href: "/projects" },
    { label: p.name },
  ]);

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    headline: p.tagline,
    description: p.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    programmingLanguage: p.language,
    author: {
      "@type": "Person",
      name: person.name,
      url: `https://${person.domain}`,
    },
    url: `https://${person.domain}/projects/${p.name}`,
    ...(p.repo ? { codeRepository: p.repo } : {}),
  };

  return (
    <article className="dot-grid border-b border-border">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 section-y-sm">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <Crumbs
            items={[
              { label: "~", href: "/" },
              { label: "projects", href: "/projects" },
              { label: p.name },
            ]}
          />
          <Link
            href="/projects"
            className="label-mono inline-flex items-center gap-1 text-muted-foreground underline-offset-4 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3" aria-hidden /> all projects
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <header>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-lg border border-border bg-card">
                  <TechIcon name={p.language} colored className="size-6" />
                </span>
                <h1 className="text-post font-mono font-bold tracking-tight">
                  <span className="text-amber-fg">./</span>
                  {p.name}
                </h1>
              </div>
              <p className="mt-4 max-w-2xl text-xl text-pretty leading-snug text-muted-foreground">
                {p.tagline}
              </p>
            </header>

            <div className="mt-10 space-y-4 text-base leading-relaxed text-pretty text-muted-foreground">
              <p className="text-lg text-foreground">{p.description}</p>
            </div>

            {p.overview && (
              <section aria-labelledby="overview-heading" className="mt-10">
                <h2
                  id="overview-heading"
                  className="label-mono mb-3 flex items-center gap-3 text-muted-foreground"
                >
                  <span className="text-amber-fg" aria-hidden>$</span>
                  case-study-overview
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {p.overview}
                </p>
              </section>
            )}

            {(p.challenge || p.solution) && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {p.challenge && (
                  <div className="rounded-lg border border-border bg-card p-5">
                    <h3 className="label-mono mb-2 text-xs text-amber-fg">
                      the challenge
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {p.challenge}
                    </p>
                  </div>
                )}
                {p.solution && (
                  <div className="rounded-lg border border-border bg-card p-5">
                    <h3 className="label-mono mb-2 text-xs text-chart-2">
                      the architectural solution
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {p.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            <section aria-labelledby="highlights-heading" className="mt-10">
              <h2
                id="highlights-heading"
                className="label-mono mb-4 flex items-center gap-3 text-muted-foreground"
              >
                <span className="text-amber-fg" aria-hidden>
                  $
                </span>
                highlights
              </h2>
              <ul className="space-y-2.5">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-baseline gap-3 text-sm">
                    <Check className="size-4 shrink-0 translate-y-0.5 text-chart-2" aria-hidden />
                    <span className="leading-relaxed text-muted-foreground">{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="stack-heading" className="mt-10">
              <h2
                id="stack-heading"
                className="label-mono mb-4 flex items-center gap-3 text-muted-foreground"
              >
                <span className="text-amber-fg" aria-hidden>
                  $
                </span>
                stack
              </h2>
              <StackList stack={p.stack} />
            </section>

            {/* Direct Project Inquiry CTA */}
            <div className="mt-12 rounded-xl border border-amber-fg/30 bg-card p-6">
              <h3 className="font-mono text-base font-semibold text-foreground">
                Need a similar product engineered?
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                I build web apps, backend APIs, and custom CMS platforms from scratch. Scope, milestones, and pricing are fully negotiable.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild size="sm" className="bg-[#229ED9] text-white hover:bg-[#1e8bc0] hover:text-white font-mono text-xs">
                  <a
                    href={person.telegram || "https://t.me/Kanferneo"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <TechIcon name="Telegram" className="size-3.5" />
                    Chat on Telegram
                    <ArrowUpRight className="size-3" aria-hidden />
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline" className="font-mono text-xs">
                  <Link href="/contact">
                    Contact Form
                  </Link>
                </Button>
              </div>
            </div>

            {otherProjects.length > 0 && prev && next && (
              <div className="mt-14">
                <PagerNav
                  navLabel="More projects"
                  prev={{ href: `/projects/${prev.name}`, label: prev.name }}
                  next={{ href: `/projects/${next.name}`, label: next.name }}
                />
              </div>
            )}
          </div>

          <aside className="h-fit space-y-4 lg:sticky lg:top-24">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="label-mono mb-5 text-muted-foreground">facts</h2>
              <dl className="space-y-4 font-mono text-sm">
                <div className="flex items-center gap-3">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <FileCode2 className="size-4" aria-hidden /> language
                  </dt>
                  <dd className="ml-auto flex items-center gap-1.5 text-right">
                    <TechIcon name={p.language} colored className="size-4" />
                    {p.language}
                  </dd>
                </div>
                <div className="flex items-center gap-3">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="size-4" aria-hidden /> status
                  </dt>
                  <dd className="ml-auto text-right font-medium text-amber-fg">
                    {p.year}{p.status ? ` · ${p.status}` : ""}
                  </dd>
                </div>
                {p.role && (
                  <div className="flex items-center gap-3">
                    <dt className="text-muted-foreground">role</dt>
                    <dd className="ml-auto text-right">{p.role}</dd>
                  </div>
                )}
                {p.category && (
                  <div className="flex items-center gap-3">
                    <dt className="text-muted-foreground">category</dt>
                    <dd className="ml-auto flex items-center gap-1.5 text-right">
                      <span className="size-1.5 rounded-full bg-chart-2" aria-hidden />
                      {p.category}
                    </dd>
                  </div>
                )}
              </dl>

              {p.repo && (
                <Button asChild variant="outline" className="mt-6 w-full font-mono text-xs">
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    visit project / repo
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                </Button>
              )}
            </div>

            {otherProjects.length > 0 && (
              <nav
                aria-label="Other projects"
                className="rounded-xl border border-border bg-card p-6"
              >
                <h2 className="label-mono mb-4 text-muted-foreground">
                  also in ~/projects
                </h2>
                <ul className="space-y-1 font-mono text-sm">
                  {otherProjects.map((x) => (
                    <li key={x.name}>
                      <Link
                        href={`/projects/${x.name}`}
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      >
                        <TechIcon name={x.language} colored className="size-3.5" />
                        {x.name}
                        <span className="ml-auto text-[0.62rem] text-muted-foreground/70">
                          {x.year}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
