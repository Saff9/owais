import type { Metadata } from "next";
import { Monitor, Cpu, Terminal, Package, Layers, Zap } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { person } from "@/content";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "The hardware, software, tools, and development setup Owais uses day-to-day as a full-stack engineer. Editor, terminal, apps, and gear.",
  keywords: [
    "developer setup",
    "developer tools",
    "what developers use",
    "VS Code setup",
    "software engineer tools",
    "web developer workflow",
    "development environment",
    "coding setup",
    "Next.js developer tools",
  ],
  alternates: { canonical: "/uses" },
  openGraph: {
    type: "website",
    title: `${person.name}'s Uses — Dev Setup & Tools`,
    description:
      "Editor, terminal, hardware, and software I use daily as a full-stack engineer.",
    url: "/uses",
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name}'s Uses — Dev Setup & Tools`,
    description:
      "Editor, terminal, hardware, and software I use daily as a full-stack engineer.",
  },
};

type UsesCategory = {
  icon: React.ElementType;
  label: string;
  items: { name: string; desc: string; url?: string }[];
};

const categories: UsesCategory[] = [
  {
    icon: Monitor,
    label: "Hardware",
    items: [
      {
        name: "Laptop",
        desc: "My daily driver — handles everything from local dev servers to Docker builds without breaking a sweat.",
      },
      {
        name: "External Monitor",
        desc: "Extra screen real estate is non-negotiable. Split-view: code on the left, browser/terminal on the right.",
      },
      {
        name: "Mechanical Keyboard",
        desc: "Tactile switches. Typing feel matters when you're doing it 8+ hours a day.",
      },
    ],
  },
  {
    icon: Cpu,
    label: "Editor & IDE",
    items: [
      {
        name: "VS Code",
        desc: "Still the best editor for full-stack work. Fast, extensible, and the ecosystem is unmatched.",
        url: "https://code.visualstudio.com",
      },
      {
        name: "Antigravity (AI Agent)",
        desc: "AI coding agent baked into VS Code. Handles boilerplate, refactoring, and complex multi-file edits.",
      },
      {
        name: "Craft Dark (Theme)",
        desc: "Low-contrast dark theme that doesn't destroy your eyes after hour 6.",
      },
      {
        name: "JetBrains Mono (Font)",
        desc: "Monospaced font with ligature support. Cleaner than Fira Code for my eyes.",
        url: "https://www.jetbrains.com/lp/mono/",
      },
    ],
  },
  {
    icon: Terminal,
    label: "Terminal & Shell",
    items: [
      {
        name: "Windows Terminal",
        desc: "Tabbed terminal, GPU-accelerated rendering, proper Unicode support.",
        url: "https://github.com/microsoft/terminal",
      },
      {
        name: "PowerShell 7",
        desc: "Cross-platform, modern scripting. Much better than the legacy Windows shell.",
      },
      {
        name: "Git + GitHub",
        desc: "Version control, obviously. I try to write commit messages my future self will thank me for.",
        url: "https://github.com/saff9",
      },
    ],
  },
  {
    icon: Package,
    label: "Dev Tools & Runtimes",
    items: [
      {
        name: "Node.js + pnpm",
        desc: "pnpm over npm — faster installs, better disk usage, deterministic lockfiles.",
        url: "https://pnpm.io",
      },
      {
        name: "Python + uv",
        desc: "uv is the fastest Python package manager I've used. No virtualenv pain.",
        url: "https://astral.sh/uv",
      },
      {
        name: "Docker Desktop",
        desc: "Local database containers, service isolation. Never install Postgres directly on your machine.",
        url: "https://www.docker.com",
      },
      {
        name: "Prisma",
        desc: "Type-safe ORM that makes database schema changes feel actually safe.",
        url: "https://www.prisma.io",
      },
      {
        name: "Postman / Thunder Client",
        desc: "API testing. Thunder Client lives inside VS Code — zero context switching.",
      },
    ],
  },
  {
    icon: Layers,
    label: "Stack (Daily)",
    items: [
      {
        name: "Next.js (App Router)",
        desc: "My default for anything web. RSC, server actions, static generation — it handles everything.",
        url: "https://nextjs.org",
      },
      {
        name: "TypeScript",
        desc: "Non-negotiable. I stopped writing JavaScript without types years ago.",
        url: "https://www.typescriptlang.org",
      },
      {
        name: "Tailwind CSS v4",
        desc: "Utility-first with the new CSS-native engine. Faster builds, cleaner config.",
        url: "https://tailwindcss.com",
      },
      {
        name: "FastAPI",
        desc: "My go-to Python backend. Async ASGI, auto Swagger docs, Pydantic validation — perfect.",
        url: "https://fastapi.tiangolo.com",
      },
      {
        name: "PostgreSQL",
        desc: "The only database I need for 95% of projects. JSONB when I need flexibility.",
        url: "https://www.postgresql.org",
      },
      {
        name: "Vercel",
        desc: "Instant preview deploys on every push. Zero infra config for Next.js.",
        url: "https://vercel.com",
      },
    ],
  },
  {
    icon: Zap,
    label: "Apps & Productivity",
    items: [
      {
        name: "Telegram",
        desc: "My primary communication channel. Groups, channels, bots — the best messaging platform for devs.",
        url: "https://t.me/Kanferneo",
      },
      {
        name: "Cal.com",
        desc: "Open-source meeting scheduler. No proprietary lock-in, works great for client calls.",
        url: "https://cal.com/saffan",
      },
      {
        name: "Notion",
        desc: "Project notes, architecture plans, meeting notes. Flexible enough to not need multiple tools.",
      },
      {
        name: "Figma (Free tier)",
        desc: "Design review and quick mockups. I read designs more than I make them.",
        url: "https://figma.com",
      },
      {
        name: "Excalidraw",
        desc: "Quick architecture diagrams. The hand-drawn aesthetic somehow makes whiteboards less intimidating.",
        url: "https://excalidraw.com",
      },
    ],
  },
];

export default function UsesPage() {
  return (
    <>
      <PageHeader
        label="uses"
        title="Setup & Tools"
        description={`Everything I use day-to-day as a full-stack engineer — hardware, editors, terminal, stack, and apps. Last updated ${new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}.`}
      />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 section-y-sm">
        {/* Listed on uses.tech notice */}
        <div className="mb-10 flex items-start gap-3 rounded-lg border border-amber-fg/30 bg-card p-4 text-sm text-muted-foreground">
          <span className="text-amber-fg font-mono text-xs pt-0.5">$</span>
          <p>
            This page is listed on{" "}
            <a
              href="https://uses.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-fg underline-offset-4 hover:underline"
            >
              uses.tech
            </a>{" "}
            — a directory of developer setups. Curious what other devs use?
            Check it out.
          </p>
        </div>

        <div className="space-y-14">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.label}>
                <h2 className="label-mono mb-5 flex items-center gap-3 text-muted-foreground">
                  <Icon className="size-3.5 text-amber-fg" aria-hidden />
                  {cat.label}
                  <span className="h-px flex-1 bg-border" aria-hidden />
                </h2>

                <div className="grid gap-3 sm:grid-cols-2">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="card-panel p-4 transition-colors hover:border-border"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-mono text-sm font-semibold text-foreground">
                          {item.name}
                        </p>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 font-mono text-[0.65rem] text-amber-fg underline-offset-4 hover:underline"
                          >
                            ↗
                          </a>
                        )}
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="mt-16 font-mono text-xs text-muted-foreground/60 border-t border-border pt-6">
          <span className="text-amber-fg">$</span> Inspired by{" "}
          <a
            href="https://uses.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline hover:text-muted-foreground"
          >
            uses.tech
          </a>
          . Missing something? Ask on{" "}
          <a
            href="https://t.me/Kanferneo"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline hover:text-muted-foreground"
          >
            Telegram
          </a>
          .
        </p>
      </section>
    </>
  );
}
