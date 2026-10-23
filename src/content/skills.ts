import type { SkillGroup } from "./types";

/** Focused core stack displayed on the Homepage preview tree */
export const homeSkillGroups: readonly SkillGroup[] = [
  {
    title: "languages",
    items: ["TypeScript", "Python"],
  },
  {
    title: "frontend",
    items: ["React", "Tailwind CSS"],
  },
  {
    title: "backend",
    items: ["Node.js", "FastAPI"],
  },
  {
    title: "ops & tools",
    items: ["Git", "Docker"],
  },
] as const;

export const homeSkillsNote =
  "Core specialized toolkit · Clean architectures · High performance & reliability";

/** Full comprehensive stack displayed on /about and in terminal commands */
export const skillGroups: readonly SkillGroup[] = [
  {
    title: "languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "Bash"],
  },
  {
    title: "frontend",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "Zustand",
      "TanStack Query",
    ],
  },
  {
    title: "backend",
    items: [
      "Node.js",
      "FastAPI",
      "Bun",
      "tRPC",
      "REST APIs",
      "Prisma",
      "PostgreSQL",
      "SQLite",
      "Zod",
      "Socket.io",
    ],
  },
  {
    title: "ops & tools",
    items: [
      "Git",
      "Docker",
      "CI/CD",
      "Vercel",
      "Playwright",
      "Vitest",
      "Linux",
    ],
  },
] as const;

/** One-liner printed under the full skills tree on /about */
export const skillsNote =
  "+ the boring-but-vital: a11y auditing · CI pipelines · code review · technical writing";
