import type { Page, Person, Service, SocialLink, Stat } from "./types";

function resolveDomain(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) {
    return envUrl.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  }
  const vercelUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercelUrl) {
    return vercelUrl.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  }
  return "owais.dev";
}

export const person: Person = {
  name: "Owais",
  firstName: "Owais",
  handle: "owais",
  role: "Software Engineer & Web Developer",
  tagline:
    "I design, build and ship web products end-to-end — fast, accessible, and engineered to last.",
  timezone: "IST · UTC+5:30",
  email: "saffanakbar942@gmail.com",
  domain: resolveDomain(),
  summary: [
    "I'm a full-stack developer who cares about the craft — clean architecture, honest performance budgets, and interfaces that feel considered down to the focus ring.",
    "My happy place is the seam between design and engineering: shipping design systems, building product surfaces, and wiring the boring-but-critical plumbing — validation, caching, observability — that keeps products alive in production.",
  ],
  roles: [
    "Full-Stack Developer",
    "Software Engineer",
    "UI/UX Developer",
    "design-systems nerd",
    "performance budget keeper",
    "terminal dweller",
  ],
  location: {
    city: "Srinagar",
    region: "Jammu & Kashmir",
    country: "India",
    countryCode: "IN",
  },
};

export const socials: readonly SocialLink[] = [
  {
    label: "GitHub",
    handle: "saff9",
    href: "https://github.com/saff9",
  },
];

export const services: readonly Service[] = [
  {
    name: "Software Engineering",
    description:
      "End-to-end product engineering — architecture, APIs, data modelling and the operational plumbing that keeps things alive.",
  },
  {
    name: "Web Development",
    description:
      "Full-stack web development with React, Next.js, TypeScript and Node.js, from first commit to production.",
  },
  {
    name: "UI/UX Development",
    description:
      "Interfaces designed and built with intent — design systems, accessible components and interactions that feel considered.",
  },
  {
    name: "Design Systems",
    description:
      "Component libraries, tokens and documentation that let small teams ship consistent UI at speed.",
  },
  {
    name: "Performance Engineering",
    description:
      "Core Web Vitals budgets, bundle diets, caching layers and the profiling work that makes sites genuinely fast.",
  },
];

export const stats: readonly Stat[] = [
  { label: "years shipping", value: "3+" },
  { label: "projects delivered", value: "10+" },
  { label: "prod incidents caused", value: "0" },
  { label: "coffee → code ratio", value: "1:∞" },
];

export const pages: readonly Page[] = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

// Add your Google/Bing verification tokens here when you claim the site
export const seo = {
  googleVerification: "",
  bingVerification: "",
} as const;
