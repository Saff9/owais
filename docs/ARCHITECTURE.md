# Architecture

This document maps the whole codebase: what lives where, how data flows from
content files to the browser, where to make common edits, which design tokens
exist, and where every piece of SEO metadata is generated. Read it once and
the folder structure should stop being something you have to remember.

Companion documents: `README.md` (editing workflow), `docs/DEPLOYMENT.md` (Vercel & Telegram guide), and `worklog.md` (build
history).

---

## 1. Folder tree

`src/` after the structure pass. One line per file, grouped by responsibility.

```text
src/
├── app/                          Next.js App Router — one folder per URL
│   ├── layout.tsx                Root shell: fonts, ThemeProvider, Navbar/Footer,
│   │                             base metadata, Person/WebSite/ProfessionalService JSON-LD
│   ├── globals.css               Design tokens ("Craft Dark"), fluid type utilities,
│   │                             fixed terminal palette — the single styling source
│   ├── page.tsx                  / — hero + featured work + skills + writing + log + CTA
│   ├── not-found.tsx             Terminal-styled 404; links every page from the pages registry
│   ├── error.tsx                 Client error boundary (retry + "cd ~"); must be a client component
│   ├── manifest.ts               /manifest.webmanifest — installable-app metadata
│   ├── opengraph-image.tsx       1200×630 OG card for the site (generated at build)
│   ├── robots.ts                 /robots.txt — allow all, disallow /api/, sitemap host
│   ├── sitemap.ts                /sitemap.xml — static pages + projects + posts
│   ├── icon.svg                  Favicon, referenced by the manifest
│   ├── about/
│   │   └── page.tsx              /about — bio, quick facts, principles, skills tree, "currently"
│   ├── blog/
│   │   ├── page.tsx              /blog — latest post wide + grid
│   │   └── [slug]/
│   │       ├── page.tsx          /blog/<slug> — article + tags + prev/next + related
│   │       └── opengraph-image.tsx  Per-post OG card
│   ├── contact/
│   │   └── page.tsx              /contact — form, response card, social links
│   ├── experience/
│   │   └── page.tsx              /experience — git log + shortlog
│   ├── projects/
│   │   ├── page.tsx              /projects — static server grid of project cards
│   │   └── [slug]/page.tsx       /projects/<slug> — case study, facts sidebar, loop pager
│   ├── rss.xml/
│   │   └── route.ts              /rss.xml — generated from the markdown posts
│   └── api/                      Route handlers (server only, never bundled for the client)
│       ├── contact/route.ts      POST /api/contact — zod validation → rate limit → Telegram / Webhook / Prisma
│       └── _lib/                 Shared API helpers; underscore = never a route
│           ├── http.ts           Sanitisation + uniform JSON error responses
│           ├── rate-limit.ts     In-memory limiter, 10 requests/IP/hour
│           └── types.ts          Minimal zod-issue shape, keeps helpers testable
│
├── components/                   Presentation, organised by route + role
│   ├── tech-icon.tsx             The only root file: name→logo map (Simple Icons +
│   │                             lucide fallbacks). Cross-cutting — imported by
│   │                             about, home, projects and layout, so it belongs
│   │                             to no single route folder.
│   ├── about/
│   │   └── skills-tree.tsx       `tree ~/skills --dirsfirst` — full skills display
│   ├── blog/
│   │   ├── markdown.tsx          Markdown → styled article (one mapping for all posts)
│   │   ├── code-block.tsx        Terminal-styled fenced-code renderer
│   │   ├── copy-code.tsx         Copy button inside code blocks (client island)
│   │   ├── post-card.tsx         Blog card for index + related lists
│   │   ├── toc.tsx               "On this page" tree from post headings (server)
│   │   ├── share-row.tsx         Post footer: X / LinkedIn links (server)
│   │   └── copy-link.tsx         Copy-permalink button (client island)
│   ├── contact/
│   │   ├── contact-form.tsx      react-hook-form + zod form; posts to /api/contact (client)
│   │   └── social-links.tsx      Profile cards from src/content/site.ts
│   ├── experience/
│   │   └── git-log.tsx           Career as `git log --graph`
│   ├── home/                     The six home-page sections
│   │   ├── hero.tsx              Identity + stat grid + terminal (client islands inside)
│   │   ├── typed-role.tsx        Typewriter for person.roles (client island)
│   │   ├── terminal.tsx          Terminal state, keyboard + host wiring (client island)
│   │   ├── terminal-commands.ts  The command engine: parsing + output (client, no JSX)
│   │   ├── terminal-frame.tsx    Title bar / status bar / line renderer (server-safe JSX)
│   │   ├── featured-projects.tsx The two flagship projects + archive link
│   │   ├── skills-preview.tsx    `tree ~/skills` — compact tree of skill groups
│   │   ├── latest-writing.tsx    Three newest posts
│   │   ├── experience-preview.tsx  Two most recent career commits
│   │   └── cta.tsx               Closing call to action + copy-email
│   ├── layout/                   The chrome around every page
│   │   ├── navbar.tsx            Sticky header (server); assembles the islands below
│   │   ├── nav-links.tsx         Desktop nav with active states (client island)
│   │   ├── mobile-nav.tsx        Sheet drawer for small screens (client island)
│   │   ├── footer.tsx            Sitemap + socials + sign-off (server)
│   │   ├── page-header.tsx       Shared inner-page header (breadcrumb + h1)
│   │   └── crumbs.tsx            `❯ ~/section/page` breadcrumb
│   ├── projects/
│   │   └── project-card.tsx      Card for grids; featured variant for home
│   ├── shared/                   Reusable across routes
│   │   ├── section-heading.tsx   `$ label ───` + h2
│   │   ├── prompt-line.tsx       `$ <command>` mono line shared by sections + form
│   │   ├── pager-nav.tsx         Prev/next loop pager (projects + blog)
│   │   └── copy-email.tsx        Clipboard + toast, button|inline variants (client)
│   ├── system/                   App-level machinery, not tied to any route
│   │   ├── theme-provider.tsx    next-themes wrapper, configured in layout.tsx (client)
│   │   └── theme-toggle.tsx      Navbar dark/light switch (client)
│   └── ui/                       shadcn/ui primitives — deliberately minimal.
│       ├── button.tsx            Used by 9 sites (nav, forms, CTA, 404, error)
│       ├── input.tsx             Contact form fields
│       ├── textarea.tsx          Contact form message field
│       ├── sheet.tsx             Mobile drawer (Radix)
│       └── sonner.tsx            Toast host, mounted once in layout.tsx
│
├── content/                      All site data — the editing surface
│   ├── site.ts                   Identity, socials, services, stats, pages, SEO codes
│   ├── skills.ts                 Skill groups for the tree + home preview
│   ├── projects.ts               Project records + getProject helper
│   ├── experience.ts             Career "commits"
│   ├── about.ts                  Bio paragraphs, principles, currently, beyond-code
│   ├── types.ts                  Shared types for everything above
│   ├── index.ts                  Barrel — `import { person, projects } from "@/content"`
│   └── blog/                     Plain markdown posts; filename = URL slug.
│       ├── _template.md          Copy this to publish (underscore = never published)
│       ├── 200ms-cold-start.md
│       ├── design-tokens-are-an-api.md
│       ├── focus-states.md
│       ├── no-flash-dark-mode.md
│       ├── strict-mode-documentation.md
│       └── trunk-based-development.md
│
└── lib/                          Framework-agnostic helpers
    ├── blog.ts                   Markdown loader: front matter, reading time,
    │                             adjacency, related, heading/TOC extraction
    ├── schema.ts                 JSON-LD builders (BreadcrumbList)
    ├── format.ts                 Deterministic date formatting
    ├── db.ts                     Prisma client singleton (contact messages)
    ├── ui-classes.ts             fieldMono — the shared form-field class string
    └── utils.ts                  cn() class-merging helper
```

Files outside `src/` that matter:

```text
README.md                        Editing workflow + architecture notes (start here)
docs/ARCHITECTURE.md             This document
docs/DEPLOYMENT.md               Vercel deployment & Telegram bot guide
vercel.json                      Vercel deployment build & routing config
prisma/schema.prisma             ContactMessage model
db/custom.db                     SQLite database file
next.config.ts                   Strict mode, no build-error suppression
eslint.config.mjs                Lint rules; ignores node_modules/.next/examples/skills
postcss.config.mjs               Tailwind v4 via @tailwindcss/postcss
components.json                  shadcn CLI settings (New York style, aliases)
.env                             DATABASE_URL, Telegram bot token & chat ID
daemon-dev.py                    Dev-server supervisor used by the sandbox
```

---

## 2. Data flow: content → server pages → props → client islands

The rule that keeps this codebase small: **content lives in `src/content/`,
rendering lives in `src/components/`, and the two only meet inside server
components.**

1. **Content layer.** `src/content/*.ts` exports plain typed constants.
   `src/content/index.ts` re-exports everything from one barrel, so app code
   imports `@/content` and never reaches into individual files. Blog posts are
   markdown files read at build time by `src/lib/blog.ts` (gray-matter front
   matter, filename as slug).

2. **Server pages.** Every `page.tsx` under `src/app/` is a server component.
   It imports content directly, renders the layout primitives
   (`PageHeader`, `SectionHeading`, cards, trees) as plain HTML, and — where a
   section needs interactivity — passes the data down as props.

3. **Client islands.** A component is marked `"use client"` only when it needs
   browser state or browser APIs. Islands never import `@/content` for values
   (only `import type`), so site data stays out of the client bundle and every
   island remains a dumb, reusable renderer of whatever props it receives.

The islands, and why each one exists:

| Island | Why it must be a client component |
| --- | --- |
| `home/terminal.tsx` | Command engine: input focus, history stack, key handlers |
| `home/typed-role.tsx` | Typewriter timer + caret state |
| `layout/nav-links.tsx` | Reads `usePathname()` to mark the active link |
| `layout/mobile-nav.tsx` | Sheet open/close state |
| `system/theme-toggle.tsx` | Reads/writes the next-themes value |
| `system/theme-provider.tsx` | next-themes context — must wrap the tree on the client |
| `shared/copy-email.tsx` | Clipboard API + toast |
| `blog/copy-code.tsx` | Clipboard API inside code blocks |
| `blog/copy-link.tsx` | Clipboard API — copies the post permalink |
| `contact/contact-form.tsx` | react-hook-form state + fetch POST |
| `app/error.tsx` | Next.js error boundaries require a client component (`reset`) |

Everything else renders on the server. That is why the contact page can pass
`person.email` into `CopyEmail` and `ContactForm` as props, the navbar can
pass `pages` into `NavLinks`/`MobileNav`, and the terminal can derive its
`goto` routes from the same `pages` registry that drives the sitemap.

The one server-side data path that is not content: the contact form POSTs to
`/api/contact`, which validates with zod, rate-limits, sanitises, and forwards
to Telegram (or webhooks). In local dev it also writes to SQLite via Prisma
(`src/lib/db.ts`). If both fail, it returns 503 and triggers the client-side
`mailto:` fallback so messages are never dropped.

---

## 3. Where do I change X?

| I want to… | Edit this |
| --- | --- |
| Change name, role, email, domain, tagline | `src/content/site.ts` → `person` |
| Change typewriter roles under the hero | `src/content/site.ts` → `person.roles` |
| Change social links (footer, contact) | `src/content/site.ts` → `socials` |
| Change the stats under the hero | `src/content/site.ts` → `stats` |
| Add local-SEO location (structured data + keywords) | `src/content/site.ts` → `person.location` (metadata-only, never rendered) |
| Add or change service verticals (SEO) | `src/content/site.ts` → `services` (feeds ProfessionalService JSON-LD) |
| Paste Google/Bing verification codes | `src/content/site.ts` → `seo` |
| Add a page to the navbar/footer/404/sitemap | `src/content/site.ts` → `pages` (plus the route file, below) |
| Edit skills | `src/content/skills.ts` (+ `tech-icon.tsx` map if a logo is missing) |
| Add/edit a project | `src/content/projects.ts` (`name` is the URL slug; `featured` picks the two on the home page) |
| Edit the career timeline | `src/content/experience.ts` |
| Edit bio, principles, "currently" | `src/content/about.ts` |
| Publish a blog post | Copy `src/content/blog/_template.md`, fill front matter, save — index, RSS, sitemap and OG image update automatically |
| Register a tech logo | `src/components/tech-icon.tsx` → `TECH_ICONS` map |
| Add a whole new page | `src/app/<route>/page.tsx` + one entry in `src/content/site.ts` `pages` |
| Change colors/theme | `src/app/globals.css` (`:root` = light, `.dark` = dark, `@theme` = terminal palette) |
| Change heading sizes or section spacing | `src/app/globals.css` → `.text-display` / `.text-page` / `.text-section` / `.text-post` / `.section-y` / `.section-y-sm` |
| Change contact-form validation or the API contract | `src/app/api/contact/route.ts` (zod schema at the top) |
| Change fonts | `src/app/layout.tsx` (next/font loaders) + the `--font-*` wiring in `globals.css` |
| Change Person/WebSite/ProfessionalService structured data | `src/app/layout.tsx` (three JSON-LD objects) |
| Change breadcrumb structured data | `src/lib/schema.ts` |
| Configure Telegram bot for contact form | `.env` locally / Vercel env vars (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`) |
| Configure Vercel deployment & build | `vercel.json` + `docs/DEPLOYMENT.md` |

If the thing you want to change is a sentence on the page, it is almost
certainly in `src/content/`. If it is a visual pattern shared by several
pages, it is in `src/components/shared/` or `globals.css`.

---

## 4. Design tokens ("Craft Dark")

Two themes, one token set, defined in `src/app/globals.css`. `:root` is the
dim paper light theme; `.dark` is the default void theme. Swap happens by
class on `<html>` (next-themes), so every token has exactly two values.

Core palette:

| Token | Dark (default) | Light | Role |
| --- | --- | --- | --- |
| `--background` | `#0b0b0d` (void) | `#e9e7dd` (dim paper) | Page background |
| `--primary` | `#f5b638` | `#f5b638` | Terminal amber — same in both themes, always with dark text |
| `--amber-fg` | `#f5b638` | `#7a540b` | Theme-safe amber for text/accents (AA on both backgrounds) |
| `--chart-2` | `#4cc38a` | `#3f7d5c` | Phosphor green — status, success, refs, checks |
| `--chart-3` | `#ef5350` | `#b32626` | Error red |
| `--border` | `#232329` | `#d2cfbf` | Hairline borders |
| `--card` | `#111114` | `#f1efe6` | Card surfaces (lifts one step above the page) |

Fonts (loaded in `src/app/layout.tsx`, wired in `globals.css`):

- **Space Grotesk** — display + body sans (`--font-grotesk`, the `font-sans` default)
- **JetBrains Mono** — terminal, labels, code (`--font-jbmono`, `font-mono`)

The terminal is deliberately **fixed-dark in both themes** — a terminal is a
dark object by nature. Its palette is static, not theme-aware:

```text
term-bg        #0d0d10     term-text      #dcdcd4
term-surface   #131317     term-dim       #8a8a93
term-border    #26262c     term-amber     #f5b638
term-green     #4cc38a     term-red       #ef5350
```

Fluid type and rhythm utilities (`@layer utilities` in `globals.css`). Each
scales with the viewport from 320px phones to wide desktops with no
breakpoint jumps; change one value and every page follows:

| Utility | Clamp range | Used for |
| --- | --- | --- |
| `.text-display` | 2.25rem → 3.9rem | Hero h1 |
| `.text-page` | 1.875rem → 3rem | Inner-page h1 (PageHeader) |
| `.text-section` | 1.875rem → 2.25rem | Section h2 |
| `.text-post` | 1.875rem → 2.25rem | Article h1 (blog posts) |
| `.section-y` | 48px → 96px | Home sections + hero padding |
| `.section-y-sm` | 40px → 64px | Inner-page sections |

Supporting utilities: `.label-mono` (uppercase mono section labels),
`.dot-grid` (subtle texture), `.caret-blink` and
`.rise` (CSS-only motion, both disabled under `prefers-reduced-motion`).

House rules baked into the design: no gradients, no glass, no glow, no
blue/indigo; amber selection with dark text; solid-amber focus rings
everywhere; hairline borders only.

---

## 5. SEO map

**Root layout** (`src/app/layout.tsx`) — inherited by every page:

- Title template (`%s | <name>`) and default title/description from `person`
- Keywords: international verticals + local variants when `person.location` is set
- Open Graph + Twitter card defaults, `metadataBase` from `person.domain`
- hreflang: `en` + `x-default` (single-language international targeting)
- RSS alternate link (`application/rss+xml`)
- `robots` directives incl. `googleBot` max-snippet/-image-preview
- Verification tags, rendered only when codes exist in `site.ts` `seo`
- Three JSON-LD nodes rendered once: **Person** (sameAs, knowsAbout,
  PostalAddress when location is set), **WebSite**, **ProfessionalService**
  (OfferCatalog built from `services`, areaServed from location)

**Per-page** — each `page.tsx` sets its own `title`, `description`,
vertical-specific `keywords` and `canonical`:

- `/about`, `/projects`, `/blog`, `/experience`, `/contact` — static metadata
- `/projects/[slug]`, `/blog/[slug]` — `generateMetadata` from the record/front matter
- Detail pages add a **BreadcrumbList** node via `src/lib/schema.ts`;
  blog posts additionally render **BlogPosting**

**Generated routes** (all static at build time):

| Route | Source |
| --- | --- |
| `/sitemap.xml` | `src/app/sitemap.ts` — pages registry + projects + posts |
| `/robots.txt` | `src/app/robots.ts` — allow all, disallow `/api/`, sitemap + host |
| `/rss.xml` | `src/app/rss.xml/route.ts` — from the markdown posts |
| `/manifest.webmanifest` | `src/app/manifest.ts` |
| `/opengraph-image`, `/blog/<slug>/opengraph-image` | Generated 1200×630 cards |
| `/icon.svg` | `src/app/icon.svg` |

**Validation habit:** after editing `site.ts`, re-check the title tag and the
JSON-LD node count on `/` and on a detail page; after touching a client
island, confirm it still has no value import from `@/content` (types only).
