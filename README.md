<div align="center">

```text
❯ ~/portfolio
```

**A server-first developer portfolio: eight pages, a working command line, a markdown blog, and one folder that holds everything you'd edit.**

[![Next.js 16](https://img.shields.io/badge/Next.js-16-0b0b0d?style=flat-square&logo=nextdotjs&logoColor=f5b638)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-0b0b0d?style=flat-square&logo=react&logoColor=f5b638)](https://react.dev)
[![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-f5b638?style=flat-square&logo=typescript&logoColor=0b0b0d)](https://www.typescriptlang.org)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-0b0b0d?style=flat-square&logo=tailwindcss&logoColor=f5b638)](https://tailwindcss.com)
[![Prisma + SQLite](https://img.shields.io/badge/Prisma-SQLite-0b0b0d?style=flat-square&logo=prisma&logoColor=f5b638)](https://www.prisma.io)
[![Bun · Node 20+](https://img.shields.io/badge/Bun%20%C2%B7%20Node-20%2B-0b0b0d?style=flat-square&logo=bun&logoColor=f5b638)](https://bun.sh)

</div>

## What's inside

| Area | Ships with |
| --- | --- |
| **Pages** | `/` (hero, terminal, featured work, skills, writing, career log, CTA) · `/about` (bio, principles, skills tree) · `/projects` grid + `/projects/[slug]` case studies · `/blog` + `/blog/[slug]` · `/experience` (career as `git log --career` + shortlog) · `/contact`. Every page is a server component. |
| **Terminal** | A real command engine on the hero, not a decoration. `help · whoami · about · skills · projects · log · contact · email · goto · theme · ls · clear`, ↑/↓ history, ⌃L, clipboard, and `goto` routing derived from the same page registry that drives the navbar, footer and sitemap. |
| **Blog** | Markdown in, pages out. gray-matter front matter, reading time, tree-style table of contents, heading anchors with hover `#` links, share row (copy permalink, X, LinkedIn), related posts, prev/next pager, per-post OG images. Six posts ship as examples. No CMS, no content database: the filename is the URL. |
| **Contact** | react-hook-form + zod on the client; `POST /api/contact` on the server: strict zod validation, in-memory rate limit (10 requests per IP per hour), input sanitisation, direct Telegram Bot API dispatch + webhooks, and local SQLite write with a resilient 503 mailto fallback. |
| **SEO** | Per-page metadata with vertical keywords and canonicals, hreflang `en` + `x-default`, three JSON-LD graphs in the root layout (Person, WebSite, ProfessionalService) plus BlogPosting and BreadcrumbList on detail pages, generated OG images, `/rss.xml`, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`. Google/Bing verification codes paste into one file and render only when set. |
| **Design** | "Craft Dark": near-black `#0b0b0d`, terminal amber `#f5b638`, phosphor green, Space Grotesk + JetBrains Mono, hairline borders, warm-paper light mode (`#e9e7dd`), and a print stylesheet so posts save as clean PDFs. |

## Quick start

Requires Node 20+ or Bun 1.1+. Run from the repo root after cloning:

```bash
bun install                                        # or: npm install
echo 'DATABASE_URL=file:../db/custom.db' > .env    # SQLite: one file, no server
bun run db:push                                    # creates db/custom.db
bun run dev                                        # http://localhost:3000
```

That is the whole setup for local hacking.

Production & Deployment:

```bash
bun run build    # prisma generate && next build (native Vercel output)
bun run start    # runs next start (or set STANDALONE=true for Docker builds)
```

For zero-config deployment to Vercel and wiring form messages to your Telegram bot in two minutes, see [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

Quality gates:

```bash
bun run lint          # eslint
bunx tsc --noEmit     # typecheck (strict)
```

## Project structure

```text
src/
├── app/                        routes: one folder per URL, all server components
│   ├── page.tsx                / (hero · terminal · featured · skills · writing · cta)
│   ├── about/  contact/  experience/
│   ├── projects/               grid + [slug] case studies
│   ├── blog/                   index + [slug] posts (per-post OG images)
│   ├── api/contact/            the only API route: zod → rate limit → Telegram / SQLite
│   ├── rss.xml/  sitemap.ts  robots.ts  manifest.ts
│   ├── layout.tsx              fonts, themes, navbar/footer, JSON-LD, base metadata
│   └── globals.css             design tokens (the single styling source)
├── components/                 presentation only, grouped by route
│   ├── home/  about/  blog/  contact/  experience/  projects/
│   ├── layout/  shared/  system/
│   ├── tech-icon.tsx           name → logo map (react-icons + lucide fallbacks)
│   └── ui/                     5 shadcn primitives: button, input, textarea, sheet, sonner
├── content/                    the editing surface (see "Make it yours")
│   ├── site.ts  skills.ts  projects.ts  experience.ts  about.ts  types.ts  index.ts
│   └── blog/                   markdown posts; _template.md is the starter
└── lib/                        markdown loader · JSON-LD builders · Prisma client · utils
```

Outside `src/`: `vercel.json` (Vercel deployment config), `prisma/schema.prisma` (ContactMessage model), `db/custom.db` (local SQLite), `next.config.ts` (strict mode, package import optimization), `docs/ARCHITECTURE.md` (the full codebase map), `docs/DEPLOYMENT.md` (Vercel & Telegram guide).

## Make it yours

Every identity value lives in `src/content/`, so customizing the site touches zero components. Ten edits, roughly ten minutes:

| # | Change | Where |
| --- | --- | --- |
| 1 | Name, role, email, domain, timezone, hero stats | `src/content/site.ts` → `person` |
| 2 | Typewriter roles under the hero | `src/content/site.ts` → `person.roles` |
| 3 | Social links (footer + contact page) | `src/content/site.ts` → `socials` |
| 4 | Service verticals to rank for (ProfessionalService JSON-LD) | `src/content/site.ts` → `services` |
| 5 | Local SEO (structured-data address, keyword variants); delete `person.location` to go international-only | `src/content/site.ts` |
| 6 | Google/Bing verification codes (meta tags render only when set) | `src/content/site.ts` → `seo` |
| 7 | Projects: `name` is the URL slug, `featured: true` picks the two on the home page | `src/content/projects.ts` |
| 8 | Career entries, rendered as `git log --career` | `src/content/experience.ts` |
| 9 | Skill groups (each item renders its tech logo) | `src/content/skills.ts` |
| 10 | Bio, principles, "currently" | `src/content/about.ts` |

Publishing a post: copy `src/content/blog/_template.md`, fill the front matter (`title`, `description`, `date`, `tags`), write markdown, save. The blog index, the home page's "latest writing" section, the sitemap, the RSS feed and the OG image update on the next build.

Two smaller knobs:

- Missing a tech logo? Add one line to the `TECH_ICONS` map in `src/components/tech-icon.tsx`. Unknown names fall back to a neutral glyph, so nothing breaks.
- Colors and type live in `src/app/globals.css` (`:root` = light, `.dark` = dark, `@theme` = terminal palette). There is no `tailwind.config`; Tailwind 4 reads its tokens from CSS.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16, App Router, native Vercel serverless / standalone Docker |
| UI | React 19, server components by default |
| Language | TypeScript, `strict` |
| Styling | Tailwind CSS 4 via `@tailwindcss/postcss` + shadcn/ui (New York, 5 primitives kept) |
| Content | Typed TS modules + markdown (`gray-matter`, `react-markdown`) |
| Forms | react-hook-form + zod, validated client and server |
| Delivery & Data | Telegram Bot API + webhooks in prod, Prisma 6 + SQLite locally |
| Theming | next-themes, class strategy, dark default, warm-paper light mode |
| Tooling | Bun (npm works too), ESLint 9, `tsc --noEmit` |

## Scripts

| Command | What it does |
| --- | --- |
| `bun run dev` | Dev server on `http://localhost:3000` |
| `bun run build` | Production build (`prisma generate && next build`) |
| `bun run start` | Runs the production Next.js server |
| `bun run lint` | ESLint over the repo |
| `bunx tsc --noEmit` | Typecheck (not a package.json script; run it directly) |
| `bun run db:push` | Sync `prisma/schema.prisma` into SQLite |
| `bun run db:generate` | Regenerate the Prisma client |
| `bun run db:migrate` | Create and apply a dev migration |
| `bun run db:reset` | Reset the database |

## Architecture notes

- **Server-first.** Every page is a React Server Component. Client code is limited to 11 islands, each with a concrete reason to exist: the terminal, the typewriter, nav active states, the mobile drawer, theme provider + toggle, three clipboard buttons (email, code, permalink), the contact form, and the error boundary. Islands never import values from `@/content`; they receive data as props from server parents, so site content never lands in a client bundle.
- **Content is data.** `src/content/*.ts` exports typed constants; posts are `.md` files read at build time. There is no CMS, no admin panel, no content database. The editor is your editor.
- **Small dependency surface.** 18 runtime dependencies plus 9 dev, down from 67 after a pruning pass. shadcn/ui keeps only the 5 primitives the site actually uses; re-add any other with `bunx shadcn@latest add <component>`.
- **Static where possible.** Posts and projects pre-render via `generateStaticParams`; `rss.xml`, `sitemap.xml`, `robots.txt`, `manifest.webmanifest` and every OG image are generated routes. The only dynamic code path is `POST /api/contact`.
- **Deploy anywhere.** Zero-config deployment to Vercel via `vercel.json`, or self-hostable with Docker (`STANDALONE=true bun run build`).
- **Print-ready.** An unlayered `@media print` block re-inks both themes to paper, hides nav/footer/terminal/toasts/buttons and prints link URLs after their text. Blog posts save as readable PDFs straight from the browser.
- **Fluid type.** Headings and section rhythm use `clamp()` utilities defined once in `globals.css`; pages scale from 320px to desktop with no breakpoint jumps.

For deployment and environment variables, read [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md). For the full annotated map (folder tree, data flow, the "where do I change X?" table, design tokens, the SEO graph), read [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

```text
❯ eof
```
