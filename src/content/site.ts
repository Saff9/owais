import type { Page, Person, Service, SocialLink, Stat } from "./types";

function resolveDomain(): string {
  // 1. Explicit custom domain configured by user in .env (NEXT_PUBLIC_SITE_URL)
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) {
    return envUrl.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  }
  // 2. Local development mode
  if (process.env.NODE_ENV === "development") {
    return "localhost:3000";
  }
  // 3. Vercel production deployment URL
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProd) {
    return vercelProd.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  }
  // 4. Vercel preview or system URL
  const vercelUrl =
    process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
  if (vercelUrl) {
    return vercelUrl.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  }
  // 5. User's active Vercel domain
  return "owaisdar.vercel.app";
}

export function getSiteUrl(): string {
  const domain = resolveDomain();
  const protocol = domain.includes("localhost") ? "http" : "https";
  return `${protocol}://${domain}`;
}

export const telegramHandle = "@Kanferneo";
const telegramPrefillText = encodeURIComponent(
  "Hi Owais! I came from your portfolio website and would like to discuss a project with you."
);
export const telegramChatUrl = `https://t.me/Kanferneo?text=${telegramPrefillText}`;

export const person: Person = {
  name: "Owais",
  firstName: "Owais",
  handle: "owais",
  role: "Software Engineer & Web Developer",
  tagline:
    "I design, build and ship web products end-to-end — fast, accessible, and engineered to last.",
  timezone: "IST · UTC+5:30",
  email: "saffanakbar942@gmail.com",
  telegram: telegramChatUrl,
  telegramHandle: telegramHandle,
  calBookingUrl: "https://cal.com/saffan",
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
  {
    label: "Telegram",
    handle: telegramHandle,
    href: telegramChatUrl,
  },
];

export const services: readonly Service[] = [
  {
    id: "web-apps",
    name: "Web Applications",
    badge: "Frontend & UI",
    icon: "web",
    description:
      "Modern, responsive web applications engineered for speed, clean UX, and accessibility across every device.",
    deliverables: [
      "Responsive SPAs & modern web platforms",
      "Pixel-perfect UI translated from Figma or design specs",
      "Core Web Vitals & technical SEO optimization",
      "Fluid state management & smooth micro-interactions",
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "backend-db",
    name: "Backend & Database",
    badge: "Server & Data",
    icon: "backend",
    description:
      "Scalable server-side logic, secure REST/tRPC APIs, structured relational database modeling, and rock-solid backend infrastructure.",
    deliverables: [
      "Type-safe tRPC & RESTful API architectures",
      "Database schema modeling & Prisma ORM migrations",
      "Secure auth (sessions/JWT), RBAC & rate limiting",
      "Optimized query performance & connection pooling",
    ],
    stack: ["Node.js", "FastAPI", "PostgreSQL", "Prisma", "SQLite"],
  },
  {
    id: "cms-panels",
    name: "CMS & Admin Panels",
    badge: "Internal Tools",
    icon: "cms",
    description:
      "Bespoke admin dashboards, internal tooling, and content management systems designed to streamline your business operations without friction.",
    deliverables: [
      "Custom CRUD back-office control panels",
      "Dynamic blog/content management workflows",
      "Role-based permissions & audit logging",
      "Interactive data tables, filters & CSV exports",
    ],
    stack: ["Next.js", "TypeScript", "shadcn/ui", "PostgreSQL"],
  },
  {
    id: "fullstack-products",
    name: "Full-Stack Products (MVP to Launch)",
    badge: "End-to-End",
    icon: "fullstack",
    description:
      "Complete product engineering from zero to production deployment. Turn your idea into a battle-tested, deployed application ready for real users.",
    deliverables: [
      "Full MVP architecture & tech stack selection",
      "Seamless frontend + backend + database integration",
      "Third-party integrations (Stripe, webhooks, analytics)",
      "Automated CI/CD pipelines, SSL & cloud hosting",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "Docker", "Vercel"],
  },
];

export const stats: readonly Stat[] = [
  { label: "years shipping", value: "3+" },
  { label: "projects delivered", value: "10+" },
  { label: "prod incidents caused", value: "0" },
  { label: "coffee → code ratio", value: "1:∞" },
];

export const pages: readonly Page[] = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

// Add your Google/Bing verification tokens here when you claim the site
export const seo = {
  googleVerification: "Q7mAqyFVwG2zeScg2UAuMLlidBEjgjwhvFngytF5_Ko",
  bingVerification: "",
} as const;
