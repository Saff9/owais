import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { person } from "@/content";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What Owais is currently focused on — projects, learning, and location. A /now page in the tradition of nownownow.com.",
  keywords: [
    "now page",
    "currently working on",
    "developer now page",
    "what I'm doing now",
    "software engineer now",
  ],
  alternates: { canonical: "/now" },
  openGraph: {
    type: "website",
    title: `Now — What ${person.name} Is Up To`,
    description: "Current focus, active projects, and what I'm learning right now.",
    url: "/now",
  },
  twitter: {
    card: "summary_large_image",
    title: `Now — What ${person.name} Is Up To`,
    description: "Current focus, active projects, and what I'm learning right now.",
  },
};

// Update this whenever life changes — it's the soul of a /now page
const NOW_DATA = {
  updatedAt: "November 2026",
  location: "Srinagar, Jammu & Kashmir, India",
  focus: [
    {
      emoji: "⚡",
      title: "Building TaskFlow & Bidora",
      body: "Engineering two independent full-stack platforms: TaskFlow (a fast, keyboard-first task management system) and Bidora (a reverse-bidding freelance marketplace).",
    },
    {
      emoji: "🏔️",
      title: "Shipping alpineclubindia.com",
      body: "Architecting and shipping a production-grade tour & travel platform for Himalayan expeditions. Focus is on the trek catalog UX and sub-second load times on mobile.",
    },
    {
      emoji: "🔌",
      title: "Taking on client projects",
      body: "Open for freelance product engineering — custom web apps, FastAPI backends, CMS panels, and MVPs. Reach out on Telegram (@Kanferneo) to discuss scope.",
    },
    {
      emoji: "📖",
      title: "Deep-diving into distributed systems",
      body: "Reading through database internals, event sourcing patterns, and message queue architectures. Building intuition for systems that survive at scale.",
    },
  ],
  notDoing: [
    "Taking on spec work or unpaid trials",
    "Working with unclear scope or no contract",
    "Chasing clients who ghost after the first message",
  ],
  reading: [
    "Designing Data-Intensive Applications — Kleppmann",
    "A Philosophy of Software Design — Ousterhout",
  ],
};

export default function NowPage() {
  return (
    <>
      <PageHeader
        label="now"
        title="What I'm Up To"
        description="A snapshot of what I'm focused on right now. Updated periodically. Inspired by the /now movement."
      />

      <section className="mx-auto max-w-2xl px-4 sm:px-6 section-y-sm">
        {/* Meta */}
        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3 text-amber-fg" aria-hidden />
            Updated {NOW_DATA.updatedAt}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3 text-amber-fg" aria-hidden />
            {NOW_DATA.location}
          </span>
        </div>

        {/* Focus items */}
        <div className="space-y-6">
          {NOW_DATA.focus.map((item) => (
            <div
              key={item.title}
              className="card-panel p-5 sm:p-6"
            >
              <h2 className="font-mono text-sm font-semibold text-foreground">
                <span className="mr-2 text-base" aria-hidden>
                  {item.emoji}
                </span>
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Not doing */}
        <div className="mt-12 border-t border-border pt-10">
          <h2 className="label-mono mb-4 flex items-center gap-3 text-muted-foreground">
            <span className="text-amber-fg">$</span>
            not-doing
          </h2>
          <ul className="space-y-2">
            {NOW_DATA.notDoing.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 font-mono text-xs text-muted-foreground"
              >
                <span className="mt-0.5 text-destructive" aria-hidden>
                  ✗
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Reading */}
        <div className="mt-10 border-t border-border pt-10">
          <h2 className="label-mono mb-4 flex items-center gap-3 text-muted-foreground">
            <span className="text-amber-fg">$</span>
            reading
          </h2>
          <ul className="space-y-2">
            {NOW_DATA.reading.map((book) => (
              <li
                key={book}
                className="font-mono text-xs text-muted-foreground"
              >
                <span className="mr-2 text-amber-fg">›</span>
                {book}
              </li>
            ))}
          </ul>
        </div>

        {/* nownownow credit */}
        <p className="mt-14 border-t border-border pt-6 font-mono text-xs text-muted-foreground/60">
          This is a{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-fg underline-offset-4 hover:underline"
          >
            /now page
          </a>
          . Inspired by{" "}
          <a
            href="https://sive.rs/now"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline hover:text-muted-foreground"
          >
            Derek Sivers
          </a>
          . Want to contact me?{" "}
          <a
            href="https://t.me/Kanferneo"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline hover:text-muted-foreground"
          >
            Telegram
          </a>{" "}
          or{" "}
          <Link
            href="/contact"
            className="underline-offset-4 hover:underline hover:text-muted-foreground"
          >
            contact form
          </Link>
          .
        </p>
      </section>
    </>
  );
}
