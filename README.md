# Owais — Developer Portfolio & Engineering Case Studies

<div align="center">

```text
❯ whoami
Owais — Software Engineer & Web Developer based in Srinagar, India.
Shipping fast, accessible, and production-grade web products end-to-end.
```

[![Live Portfolio](https://img.shields.io/badge/Live_Site-owaisdar.vercel.app-f5b638?style=flat-square&logo=vercel&logoColor=0b0b0d)](https://owaisdar.vercel.app)
[![Chat on Telegram](https://img.shields.io/badge/Telegram-@Kanferneo-229ED9?style=flat-square&logo=telegram&logoColor=white)](https://t.me/Kanferneo)
[![Book Call](https://img.shields.io/badge/Cal.com-15--min_call-0b0b0d?style=flat-square&logo=googlemeet&logoColor=f5b638)](https://cal.com/saffan)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.3-0b0b0d?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## Overview

A high-performance personal portfolio, service catalog, and engineering blog engineered with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **TypeScript**. Built around a minimalist **Craft Dark** terminal aesthetic with honest performance budgets and zero client bloat.

- **Live URL**: [https://owaisdar.vercel.app](https://owaisdar.vercel.app)
- **Author**: Owais ([@saff9](https://github.com/saff9))
- **Role**: Software Engineer & Web Developer
- **Location**: Srinagar, Jammu & Kashmir, India

---

## Key Features

### 💻 Interactive Hero Terminal
A fully-featured client-side command engine running right on the homepage hero:
* Supported commands: `help`, `whoami`, `about`, `services`, `skills`, `projects`, `log`, `uses`, `now`, `telegram`, `cal`, `email`, `goto <page>`, `theme`, `clear`.
* Persistent `↑` / `↓` command history, `Ctrl+L` clear shortcut, and clipboard access.

### 🛠️ Services & Transparent Delivery (`/services`)
* Comprehensive catalog covering **Web Applications**, **Backend & APIs**, **CMS Panels**, and **Full-Stack MVPs**.
* **Negotiable pricing model**: Scope-based and milestone-oriented instead of rigid packages.
* Interactive FAQ section backed by Schema.org `FAQPage` structured data.

### 📂 In-Depth Case Studies (`/projects`)
Dedicated write-ups with problem statements, architectural solutions, and tech highlights:
* **[Alpine Club India](https://owaisdar.vercel.app/projects/alpineclubindia)** — Expedition tour and travel catalog built with Next.js and AVIF/WebP image optimization.
* **[Pulse Admin](https://owaisdar.vercel.app/projects/pulse-admin)** — Full-stack operational CMS and dashboard with RBAC, Prisma ORM, and PostgreSQL.
* **[Zenith API](https://owaisdar.vercel.app/projects/zenith-api)** — High-throughput asynchronous RESTful API with FastAPI, JWT rotation, and Docker.
* **[Kashmir Crafts](https://owaisdar.vercel.app/projects/kashmir-crafts)** — Lightweight artisan e-commerce storefront with Zustand state and WhatsApp checkout.

### ✍️ Technical Engineering Blog (`/blog`)
* Pure Markdown-powered publishing with `gray-matter`, reading time estimates, table of contents, and anchor links.
* **Latest Posts**:
  - *What I'm Building: TaskFlow and Bidora* (Architectural write-up on task management and reverse-bidding freelance platforms)
  - *Building Alpine Club India: How I Designed a Fast Tour Catalog*
  - *Why I Use FastAPI with Next.js for High-Throughput APIs*
  - *Prisma & PostgreSQL: 5 Practical Patterns That Saved Us in Production*
  - *Clean Admin Dashboards Without Bloat*
  - *No-Flash Dark Mode in Next.js with Tailwind CSS*
* Dynamic per-post OpenGraph images and full [RSS 2.0 feed](https://owaisdar.vercel.app/rss.xml).

### 🔍 Advanced SEO & Discoverability
* **Rich Schema.org JSON-LD**: `Person`, `WebSite` with SearchAction, `ProfessionalService` (Worldwide), `SoftwareApplication`, `BlogPosting`, `FAQPage`, and `BreadcrumbList`.
* **Social Cards**: Custom 1200×630 OpenGraph and Twitter cards for every page, project, and blog post.
* **AI Engine Optimization (GEO)**: Machine-readable summary at [`/llms.txt`](https://owaisdar.vercel.app/llms.txt) and [`/llms-full.txt`](https://owaisdar.vercel.app/llms-full.txt) following the [llmstxt.org](https://llmstxt.org) standard for ChatGPT, Claude, and Perplexity.
* **Developer Standards**: Standardized [`/.well-known/security.txt`](https://owaisdar.vercel.app/.well-known/security.txt) (RFC 9116) and [`/humans.txt`](https://owaisdar.vercel.app/humans.txt).
* **Setup & Focus**: Dedicated [`/uses`](https://owaisdar.vercel.app/uses) and [`/now`](https://owaisdar.vercel.app/now) pages.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16.4.3 (App Router, Server Components by default) |
| **Frontend** | React 19, TypeScript (Strict), Tailwind CSS v4, shadcn/ui |
| **State & Data** | Zustand, TanStack Query, React Hook Form, Zod |
| **Backend & ORM** | Node.js, FastAPI (Python), Prisma 6, PostgreSQL |
| **Content** | Markdown (`gray-matter`, `react-markdown`), gray-matter frontmatter |
| **Analytics & Edge** | Vercel Web Analytics (`@vercel/analytics/next`), Vercel Edge Network |
| **Styling** | "Craft Dark" terminal palette, Space Grotesk + JetBrains Mono typography |

---

## Project Structure

```text
mysite/
├── public/                     Static icons and assets
├── src/
│   ├── app/                    App Router pages and route handlers
│   │   ├── page.tsx            Homepage (Hero, Terminal, Featured Work, Writing, CTA)
│   │   ├── about/              Bio, technical principles, skills tree
│   │   ├── services/           Engineering services, deliverables, FAQ
│   │   ├── projects/           Case studies grid & [slug] deep-dives
│   │   ├── blog/               Technical articles & [slug] reader
│   │   ├── uses/               Hardware, terminal, editor, and software setup
│   │   ├── now/                Current active focus and reading list
│   │   ├── contact/            Contact form & direct booking options
│   │   ├── llms.txt/           AI discovery endpoint
│   │   ├── llms-full.txt/      Comprehensive AI knowledge base
│   │   ├── .well-known/        RFC 9116 security.txt
│   │   ├── humans.txt/         Developer credits
│   │   ├── rss.xml/            RSS 2.0 feed
│   │   ├── sitemap.ts          Dynamic XML sitemap
│   │   ├── robots.ts           Bot & AI crawler directives
│   │   ├── manifest.ts         PWA web manifest
│   │   └── opengraph-image.tsx Branded root social preview card
│   ├── components/             Modular UI components
│   │   ├── home/               Hero, Terminal, Skills Preview, CTA
│   │   ├── services/           FAQ Accordion, pricing cards
│   │   ├── blog/               Markdown renderer, TOC, Share row, Author card
│   │   ├── layout/             Navbar, Footer, Crumbs, PageHeader
│   │   └── ui/                 Radix UI & Sonner primitives
│   ├── content/                Site configuration & data source
│   │   ├── site.ts             Person bio, services, navigation, SEO tokens
│   │   ├── projects.ts         Case studies database
│   │   ├── skills.ts           Grouped language and framework skills
│   │   ├── experience.ts       Career timeline
│   │   └── blog/*.md           Published Markdown articles
│   └── lib/                    Schema builders, blog loaders, utilities
├── next.config.ts              Caching headers, package imports, image rules
├── package.json
└── tsconfig.json
```

---

## Local Development

### Prerequisites
* Node.js 20+ installed
* npm, pnpm, or bun

### Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Saff9/owais.git
   cd owais
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Verify quality gates**:
   ```bash
   # Run TypeScript strict typecheck
   npx tsc --noEmit

   # Run ESLint
   npm run lint

   # Run production build
   npm run build
   ```

---

## Contact & Hire

I am open to contract work, freelance projects, and MVP engineering.

* **Telegram**: [@Kanferneo](https://t.me/Kanferneo) *(Fastest response)*
* **Schedule Call**: [cal.com/saffan](https://cal.com/saffan) *(15-min discovery)*
* **Email**: [saffanakbar942@gmail.com](mailto:saffanakbar942@gmail.com)
* **Website**: [https://owaisdar.vercel.app](https://owaisdar.vercel.app)

---

<div align="center">
<sub>Crafted with care by Owais · Srinagar, J&K, India</sub>
</div>
