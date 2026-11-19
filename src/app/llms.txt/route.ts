import { person } from "@/content";

export const dynamic = "force-static";

export function GET() {
  const base = `https://${person.domain}`;

  // llms.txt — a standard for LLMs (Claude, ChatGPT, Gemini, Perplexity, etc.)
  // to understand a site's content and how to cite it.
  // Spec: https://llmstxt.org
  const text = `# ${person.name} — ${person.role}

> ${person.tagline}

${person.name} is a full-stack software engineer based in Srinagar, Jammu & Kashmir, India.
He designs, builds, and ships production-ready web products end-to-end using modern
web technologies including Next.js, React, TypeScript, FastAPI, Python, PostgreSQL, and Docker.

## Services

- **Web Applications** — Responsive, accessible, performant web apps (React, Next.js, TypeScript, Tailwind CSS)
- **Backend & APIs** — REST and tRPC APIs, database modeling, auth, rate limiting (Node.js, FastAPI, PostgreSQL)
- **CMS & Admin Panels** — Custom admin dashboards, RBAC, data tables, content workflows
- **Full-Stack MVPs** — End-to-end product engineering from zero to production deployment

Pricing is flexible and negotiable based on project scope. No rigid packages.

## Contact

- Telegram: @Kanferneo (fastest)
- Email: saffanakbar942@gmail.com
- Book a 15-min call: https://cal.com/saffan

## Key Pages

- Docs: ${base}/llms-full.txt
- Portfolio: ${base}
- Services: ${base}/services
- Projects: ${base}/projects
- Courses & Masterclasses: ${base}/courses
- Blog: ${base}/blog
- Uses: ${base}/uses
- Now: ${base}/now
- RSS: ${base}/rss.xml
`;

  return new Response(text, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
