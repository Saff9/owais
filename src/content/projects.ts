import type { Project } from "./types";

export const projects: readonly Project[] = [
  {
    name: "alpineclubindia",
    year: "2026",
    tagline: "Tour and travel exploration platform for Himalayan expeditions",
    description:
      "A comprehensive tour and travel website for Alpine Club India (alpineclubindia.com) — featuring curated Himalayan expeditions, trekking packages, guided tours, and mountain travel experiences across India and Kashmir.",
    overview:
      "Alpine Club India required a modern, highly responsive web presence to showcase high-altitude Himalayan expeditions, remote trek itineraries, and mountaineering packages. The platform needed to perform seamlessly on remote networks while offering an intuitive booking inquiry flow.",
    challenge:
      "Mountain travelers frequently browse tour itineraries from weak 3G/4G connections. The site had to load under 1.5s on mobile, handle high-resolution landscape photography without jank, and present complex trek itineraries (elevation gains, gear checklists, difficulty tiers) with zero confusion.",
    solution:
      "Architected using Next.js App Router and Tailwind CSS, utilizing automatic AVIF/WebP image compression, streaming server-rendered pages, and instant client-side route transitions. Implemented an interactive trek exploration catalog with altitude graphs and structured JSON-LD for local adventure tourism SEO.",
    highlights: [
      "Dynamic expedition catalog with trek altitudes, difficulty levels, and gear checklists",
      "Sub-second load times engineered for remote 3G/4G network connectivity",
      "Mobile-first responsive architecture built with Next.js App Router and Tailwind CSS",
      "Semantic Schema.org metadata driving local and international travel search rankings",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    language: "TypeScript",
    featured: true,
    repo: "https://alpineclubindia.com",
    status: "in dev",
    role: "Full-Stack Design & Development",
    category: "tour & travel",
  },
  {
    name: "pulse-admin",
    year: "2026",
    tagline: "Modern full-stack CMS & operational admin dashboard with RBAC",
    description:
      "A production-grade internal administration panel and CMS designed for business operations — featuring real-time revenue and metric cards, multi-column database filtering, Role-Based Access Control (RBAC), and fast CSV exports.",
    overview:
      "Built to demonstrate how modern businesses can replace clunky spreadsheets with a lightning-fast, custom-engineered administration dashboard. Pulse Admin provides managers and operators with complete visibility over users, transactions, and content pipelines.",
    challenge:
      "Admin panels often suffer from bloated client bundles, slow database queries on large tables, and confusing permission rules that compromise data security.",
    solution:
      "Built with Next.js, TypeScript, shadcn/ui, and Prisma ORM backed by PostgreSQL. Implemented server-side pagination, debounced multi-field search queries with SQL indexation, and strict Role-Based Access Control (RBAC) enforced via server actions and API route guards.",
    highlights: [
      "Role-Based Access Control (RBAC) supporting multi-tier admin and editor authorization levels",
      "Interactive data tables with server-side pagination, multi-column search, and instantaneous CSV export",
      "Prisma ORM data access layer with indexed queries and PostgreSQL connection pooling",
      "Keyboard-first navigation, dark/light theme persistence, and accessible form validations via Zod & React Hook Form",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Prisma", "PostgreSQL"],
    language: "TypeScript",
    featured: true,
    repo: "https://github.com/saff9",
    status: "production",
    role: "Architecture & Backend Database Engineering",
    category: "CMS & Admin Dashboard",
  },
  {
    name: "zenith-api",
    year: "2025",
    tagline: "High-throughput asynchronous RESTful backend service built with FastAPI",
    description:
      "A production-ready asynchronous REST API built with Python and FastAPI. Engineered with automated OpenAPI/Swagger documentation, JWT bearer token authentication, request payload validation with Pydantic, and background task queues.",
    overview:
      "Zenith API is a modular backend architecture engineered to demonstrate high-concurrency API performance, clean schema validation, and secure authentication flows for mobile and web client consumers.",
    challenge:
      "Traditional synchronous Python APIs struggle under concurrent I/O-bound requests, leading to slow response times and high server resource utilization.",
    solution:
      "Leveraged FastAPI's asynchronous ASGI architecture with `async`/`await` database access via SQLAlchemy and PostgreSQL. Implemented JWT authentication with token rotation, Pydantic data schemas, automated Swagger documentation, and a Dockerized deployment pipeline.",
    highlights: [
      "Sub-15ms endpoint response latencies utilizing asynchronous ASGI event loops in FastAPI",
      "JWT authentication lifecycle with token refresh rotation and bcrypt password hashing",
      "Dockerized container workflow ready for zero-downtime deployment on AWS or VPS",
      "Automated unit and integration test suite with high test coverage and CI pipeline",
    ],
    stack: ["FastAPI", "Python", "PostgreSQL", "Docker", "Git"],
    language: "Python",
    featured: true,
    repo: "https://github.com/saff9",
    status: "shipped",
    role: "Backend Architecture & API Engineering",
    category: "Backend & Cloud API",
  },
  {
    name: "kashmir-crafts",
    year: "2025",
    tagline: "Artisan e-commerce showcase for authentic Kashmiri handicraft artisans",
    description:
      "A responsive e-commerce storefront showcasing authentic Kashmiri handicraft artisans — shawls, woodwork, and papier-mâché. Built for high conversion with instant category filtering, image lightbox galleries, and persistent cart state.",
    overview:
      "Created to support local artisans from Srinagar and Kashmir by giving them an international-standard digital storefront with fast checkout inquiries, high-resolution product appreciation, and zero friction.",
    challenge:
      "Artisan products require high-resolution photography to demonstrate handmade craft quality, but heavy images destroy mobile page speed and hurt conversion rates.",
    solution:
      "Engineered an image optimization pipeline utilizing modern AVIF formats and blurred image placeholders. Paired with Zustand for lightweight client state management and direct WhatsApp/Telegram checkout inquiry integrations.",
    highlights: [
      "Persistent client cart state built with lightweight Zustand and zero layout shift",
      "Next-gen AVIF and WebP image optimization pipeline for ultra-crisp artisan product displays",
      "Mobile-first checkout inquiry flow with direct WhatsApp & Telegram order confirmation",
      "Optimized Core Web Vitals scoring 98+ on Google Lighthouse Mobile",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Zustand"],
    language: "TypeScript",
    featured: false,
    repo: "https://github.com/saff9",
    status: "shipped",
    role: "Frontend Engineering & Performance Optimization",
    category: "E-Commerce & Catalog",
  },
];

export function getProject(name: string): Project | undefined {
  return projects.find((p) => p.name === name);
}
