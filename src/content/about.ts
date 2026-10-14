import type { Principle } from "./types";

/** The `icon` field maps to a lucide icon in the About page component. */
export const principles: readonly Principle[] = [
  {
    icon: "ship",
    title: "Ship small, ship often",
    body: "Long-lived branches are where projects go to die. I prefer a steady cadence of small, reviewable, revertable changes with the safety net to prove it.",
  },
  {
    icon: "types",
    title: "Types are documentation",
    body: "A strict type system is a contract the compiler enforces on every save. Docs drift; types don't. I write code so the next reader — usually future me — can delete confidently.",
  },
  {
    icon: "performance",
    title: "Performance is a feature",
    body: "Every 100ms of latency is a design decision someone made. I treat budgets like acceptance criteria, not aspirations, and I profile before I opine.",
  },
  {
    icon: "accessibility",
    title: "Accessibility is table stakes",
    body: "Keyboard paths, focus rings, contrast, semantics — baked in from the first commit, not sprinkled on before the audit. The web is for everyone or it's for no one.",
  },
];

/** Snapshot card — update whenever it goes stale. */
export const currently = {
  learning: "Modern full-stack patterns & performance engineering",
  building: "alpineclubindia.com (tour & travel platform)",
  reading: "Designing Data-Intensive Applications",
} as const;

/** Non-code facts for the "beyond the terminal" card. */
export const beyondCode = [
  "Dadra-tuned playlists while debugging",
  "Weekend hikes when the weather cooperates",
  "Espresso obsessive — dialed in, not snobby",
] as const;
