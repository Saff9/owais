import type { Metadata } from "next";
import Link from "next/link";
import {
  Laptop,
  Database,
  SlidersHorizontal,
  Rocket,
  CheckCircle2,
  ArrowUpRight,
  Handshake,
  ShieldCheck,
  Zap,
  GitBranch,
  Layers,
  HelpCircle,
  Video,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { StackList, TechIcon } from "@/components/tech-icon";
import { Button } from "@/components/ui/button";
import { CopyEmail } from "@/components/shared/copy-email";
import { FaqAccordion } from "@/components/services/faq-accordion";
import { services, person } from "@/content";

export const metadata: Metadata = {
  title: "Services & Capabilities",
  description:
    "Hire a full-stack engineer for custom web apps, backend APIs, CMS panels, and MVP delivery. Scope-based, negotiable pricing with transparent milestones.",
  keywords: [
    "hire software engineer",
    "hire web developer",
    "freelance web developer",
    "web application development",
    "backend development",
    "FastAPI developer",
    "Next.js developer",
    "custom cms panel",
    "full stack mvp",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Services | ${person.name}`,
    description:
      "Hire a full-stack engineer for custom web apps, backend APIs, CMS panels, and MVP delivery. Scope-based, negotiable pricing with transparent milestones.",
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title: `Services | ${person.name}`,
    description:
      "Hire a full-stack engineer for custom web apps, backend APIs, CMS panels, and MVP delivery. Scope-based, negotiable pricing with transparent milestones.",
  },
};

const SERVICE_ICONS = {
  web: Laptop,
  backend: Database,
  cms: SlidersHorizontal,
  fullstack: Rocket,
} as const;

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Architecture",
    description:
      "We align on your product requirements, user workflows, database schema, and technical priorities to eliminate ambiguity before writing code.",
  },
  {
    step: "02",
    title: "Milestone-Based Sprints",
    description:
      "Work is broken into clear, testable deliverables. You get live staging links and regular updates, so there are never any surprises.",
  },
  {
    step: "03",
    title: "Performance & Type Safety",
    description:
      "Built with strict TypeScript, clean modular structure, Core Web Vitals optimization, and thorough edge-case testing.",
  },
  {
    step: "04",
    title: "Production Launch & Handover",
    description:
      "Deployment to your hosting provider, domain and SSL configuration, documentation, and 100% git repository & IP ownership transferred to you.",
  },
];

const FAQS = [
  {
    q: "How does pricing work?",
    a: "I do not use rigid, overpriced tier packages. Every project has unique scope and deadlines. Pricing is flexible and negotiable based on your project requirements — whether milestone-based, fixed-scope, or dedicated sprint.",
  },
  {
    q: "Do I get full ownership of the source code?",
    a: "Yes, absolutely. You receive 100% intellectual property (IP) and full access to the Git repository, documentation, and deployment credentials upon milestone completion.",
  },
  {
    q: "What is the best way to contact you?",
    a: "Telegram (@Kanferneo) is the fastest way for instant project scoping, questions, and negotiating details. You can also use the contact form or send an email.",
  },
  {
    q: "Can you build an MVP from scratch?",
    a: "Yes. From database modeling and API architecture to responsive frontends, payment integration, and cloud deployment, I handle end-to-end execution to get your product in front of users fast.",
  },
];

export default function ServicesPage() {
  const telegramHref = person.telegram || "https://t.me/Kanferneo";
  const calHref = person.calBookingUrl || "https://cal.com/saffan";

  return (
    <>
      <PageHeader
        label="services & capabilities"
        title="Engineering & Delivery"
        description="I design, build, and ship production-ready web products. Whether you need a high-performance web app, robust backend APIs, a custom admin CMS, or a complete MVP from scratch."
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 section-y-sm">
        {/* Core Services Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((svc) => {
            const Icon =
              svc.icon && SERVICE_ICONS[svc.icon]
                ? SERVICE_ICONS[svc.icon]
                : Rocket;

            return (
              <div
                key={svc.name}
                className="card-panel group flex flex-col justify-between p-6 sm:p-8 transition-all hover:border-amber-fg/40 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex size-11 items-center justify-center rounded-lg border border-border bg-background text-amber-fg transition-transform group-hover:scale-105">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    {svc.badge && (
                      <span className="label-mono rounded-full border border-border bg-muted/60 px-3 py-1 text-[0.7rem] text-muted-foreground">
                        {svc.badge}
                      </span>
                    )}
                  </div>

                  <h2 className="mt-5 font-mono text-xl font-bold tracking-tight text-foreground">
                    {svc.name}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {svc.description}
                  </p>

                  {svc.deliverables && svc.deliverables.length > 0 && (
                    <ul className="mt-5 space-y-2 border-t border-border/60 pt-4">
                      {svc.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          <CheckCircle2
                            className="mt-0.5 size-3.5 shrink-0 text-amber-fg"
                            aria-hidden
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {svc.stack && svc.stack.length > 0 && (
                  <div className="mt-6 border-t border-border/60 pt-4">
                    <p className="label-mono mb-2 text-[0.65rem] text-muted-foreground">
                      core stack
                    </p>
                    <StackList stack={svc.stack} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pricing Policy Card */}
        <div className="mt-12 overflow-hidden rounded-xl border border-amber-fg/40 bg-card p-6 sm:p-10 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-amber-fg">
                <Handshake className="size-4" aria-hidden />
                <span>$ pricing --policy</span>
              </div>

              <h2 className="mt-3 font-mono text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                No rigid packages.{" "}
                <span className="text-amber-fg">Pricing is negotiable.</span>
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Every project has its own scope, deadlines, and technical depth.
                Rather than charging fixed cookie-cutter rates, I tailor pricing
                directly to your specifications — whether fixed-scope,
                milestone-based, or hourly sprint.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-chart-2" />
                  Milestone payments
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="size-3.5 text-chart-2" />
                  Transparent estimates
                </span>
                <span className="flex items-center gap-1.5">
                  <GitBranch className="size-3.5 text-chart-2" />
                  Full source code transfer
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:justify-end">
              <Button
                asChild
                size="lg"
                className="bg-[#229ED9] font-mono text-sm text-white hover:bg-[#1e8bc0] hover:text-white"
              >
                <a
                  href={telegramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <TechIcon name="Telegram" className="size-4" />
                  <span>Chat on Telegram</span>
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="font-mono text-sm hover:border-amber-fg"
              >
                <a
                  href={calHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Video className="size-4 text-amber-fg" />
                  <span>Book 15-Min Call</span>
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="ghost"
                className="font-mono text-sm text-muted-foreground hover:text-foreground"
              >
                <Link href="/contact">
                  <span className="text-amber-fg" aria-hidden>
                    ❯
                  </span>{" "}
                  Contact Form
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* 4-Step Process Section */}
        <div className="mt-16 border-t border-border pt-12">
          <p className="label-mono mb-2 flex items-center gap-2 text-muted-foreground">
            <span className="text-amber-fg">$</span> how-we-collaborate
          </p>
          <h2 className="text-section font-semibold tracking-tight">
            How I take projects from concept to deployment
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((p) => (
              <div
                key={p.step}
                className="card-panel p-5 sm:p-6 transition-colors hover:border-border"
              >
                <span className="font-mono text-xs font-bold text-amber-fg">
                  {p.step}
                </span>
                <h3 className="mt-2 font-mono text-base font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Client FAQ Section */}
        <div className="mt-16 border-t border-border pt-12">
          <p className="label-mono mb-2 flex items-center gap-2 text-muted-foreground">
            <HelpCircle className="size-3.5 text-amber-fg" aria-hidden />
            faq
          </p>
          <h2 className="text-section font-semibold tracking-tight">
            Frequently Asked Questions
          </h2>

          <FaqAccordion faqs={FAQS} />
        </div>

        {/* Bottom CTA Band */}
        <div className="mt-16 text-center rounded-xl border border-border bg-card/60 p-8 sm:p-12">
          <h2 className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            Let&apos;s discuss your vision, scope, and timeline. I reply promptly on Telegram.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-[#229ED9] font-mono text-sm text-white hover:bg-[#1e8bc0] hover:text-white"
            >
              <a
                href={telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <TechIcon name="Telegram" className="size-4" />
                Message @Kanferneo
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-mono text-sm hover:border-amber-fg"
            >
              <a
                href={calHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Video className="size-4 text-amber-fg" />
                <span>Book 15-Min Call</span>
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </Button>
            <CopyEmail variant="button" email={person.email} />
          </div>
        </div>
      </section>
    </>
  );
}
