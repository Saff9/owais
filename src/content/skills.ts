import type { SkillGroup } from "./types";

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

/** One-liner printed under the skills tree. */
export const skillsNote =
  "+ the boring-but-vital: a11y auditing · CI pipelines · code review · technical writing";
