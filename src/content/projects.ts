import type { Project } from "./types";

export const projects: readonly Project[] = [
  {
    name: "alpineclubindia",
    year: "2026",
    tagline: "Tour and travel website for Alpine Club India",
    description:
      "A comprehensive tour and travel website for Alpine Club India (alpineclubindia.com) — featuring curated Himalayan expeditions, trekking packages, guided tours, and mountain travel experiences across India.",
    highlights: [
      "Currently building: booking engine and dynamic tour exploration catalog",
      "Interactive expedition itineraries, trek difficulty levels, and gear checklists",
      "Mobile-first responsive architecture built for fast loading on remote networks",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    language: "TypeScript",
    featured: true,
    repo: "https://alpineclubindia.com",
    status: "in dev",
    role: "design & development",
    category: "tour & travel",
  },
];

export function getProject(name: string): Project | undefined {
  return projects.find((p) => p.name === name);
}
