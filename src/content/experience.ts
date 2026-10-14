import type { Experience } from "./types";

export const experience: readonly Experience[] = [
  {
    hash: "e9a4f21",
    ref: "HEAD -> main",
    period: "2026 — now",
    role: "Full-Stack Developer",
    company: "Building & Shipping",
    points: [
      "Deepening expertise and gaining hands-on production experience across modern full-stack web technologies.",
      "Actively developing and shipping products, including alpineclubindia.com.",
    ],
  },
  {
    hash: "d8b1c40",
    ref: "tag: v2.0",
    period: "2025",
    role: "Frontend & Full-Stack Developer",
    company: "Projects & Freelance",
    points: [
      "Learned Next.js, React, and Tailwind CSS for component-driven web development.",
      "Built and shipped small web applications, personal projects, and freelance client work.",
    ],
  },
  {
    hash: "c4f7a19",
    ref: "tag: v1.0",
    period: "2024",
    role: "Backend & Systems",
    company: "Learning & Foundations",
    points: [
      "Learned TypeScript, Python, modern web frameworks, and backend basics.",
      "Built APIs, connected databases, and implemented structured server-side logic.",
    ],
  },
  {
    hash: "b2e08a5",
    ref: "initial",
    period: "2023",
    role: "Web Fundamentals",
    company: "First Commits",
    points: [
      "Learned HTML, CSS, JavaScript, and core web development basics.",
      "Built foundational static websites and developed responsive layout skills.",
    ],
  },
] as const;
