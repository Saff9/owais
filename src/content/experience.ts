import type { Experience } from "./types";

export const experience: readonly Experience[] = [
  {
    hash: "e9a4f21",
    ref: "HEAD -> main",
    period: "2026 — now",
    role: "Full-Stack Engineer & Product Builder",
    company: "Independent / Client Work",
    points: [
      "Architecting and shipping production full-stack platforms, including Alpine Club India (alpineclubindia.com).",
      "Engineering responsive Next.js frontends, type-safe APIs with FastAPI and Node.js, and scalable PostgreSQL database schemas.",
    ],
  },
  {
    hash: "d8b1c40",
    ref: "tag: v2.0",
    period: "2025",
    role: "Full-Stack & Frontend Developer",
    company: "Client Deliverables & Products",
    points: [
      "Delivered custom web applications, admin dashboards, and component libraries using Next.js, React, and Tailwind CSS.",
      "Implemented secure authentication, state management pipelines, and sub-second page performance budgets.",
    ],
  },
  {
    hash: "c4f7a19",
    ref: "tag: v1.0",
    period: "2024",
    role: "Backend & Database Engineer",
    company: "Core Systems & APIs",
    points: [
      "Built RESTful and asynchronous backend services with Python (FastAPI), TypeScript, and Prisma ORM.",
      "Designed relational database schemas in PostgreSQL and SQLite with indexed query optimization and migrations.",
    ],
  },
  {
    hash: "b2e08a5",
    ref: "initial",
    period: "2023",
    role: "Software & Web Development",
    company: "Early Foundations",
    points: [
      "Built foundational responsive web applications with semantic HTML5, modern CSS, and JavaScript.",
      "Adopted web accessibility (a11y) standards, Git version control, and Linux development workflows.",
    ],
  },
] as const;
