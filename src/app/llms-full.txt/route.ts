import { person, services, projects, pages } from "@/content";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

export function GET() {
  const base = `https://${person.domain}`;
  const posts = getAllPosts();

  // llms-full.txt — the complete content dump for LLMs.
  // This lets AI assistants (Claude, ChatGPT, Perplexity, Gemini) answer
  // questions like "who is a good freelance Next.js developer in India?"
  // and cite this site accurately.
  const text = `# ${person.name} — ${person.role}

## About

${person.name} is a full-stack software engineer and web developer based in Srinagar, Jammu & Kashmir, India.
He has 3+ years of experience shipping production web applications.

${person.summary?.join("\n\n") ?? ""}

Location: ${person.location?.city}, ${person.location?.region}, ${person.location?.country}
Timezone: ${person.timezone}
Email: ${person.email}
Telegram: @Kanferneo
Cal.com: https://cal.com/saffan
GitHub: https://github.com/saff9
Portfolio: ${base}

---

## Services

${services
  .map(
    (s) => `### ${s.name}
${s.description}

Deliverables:
${s.deliverables?.map((d) => `- ${d}`).join("\n") ?? ""}

Tech stack: ${s.stack?.join(", ") ?? ""}
`
  )
  .join("\n")}

Pricing philosophy: Flexible and negotiable. No rigid packages. Scope-based, milestone-based, or hourly sprint.
Contact: Telegram @Kanferneo or https://cal.com/saffan

---

## Projects

${projects
  .map(
    (p) => `### ${p.name} (${p.year})
${p.tagline}

${p.description}

${p.overview ? `Overview: ${p.overview}` : ""}
Stack: ${p.stack.join(", ")}
Category: ${p.category ?? ""}
URL: ${base}/projects/${p.name}
`
  )
  .join("\n")}

---

## Blog Posts

${posts
  .map(
    (p) => `### ${p.title}
Date: ${p.date}
Tags: ${p.tags.join(", ")}
${p.description}
URL: ${base}/blog/${p.slug}
`
  )
  .join("\n")}

---

## Site Map

${pages.map((p) => `- ${base}${p.href} — ${p.label}`).join("\n")}
- ${base}/uses — Tools, hardware, and software setup
- ${base}/now — What ${person.name} is currently working on
- ${base}/blog — Technical writing
- ${base}/privacy — Privacy policy
- ${base}/terms — Terms of service
- ${base}/rss.xml — RSS feed
- ${base}/llms.txt — LLM summary (this file, short version)
- ${base}/llms-full.txt — Full content index for LLMs

---

## Technical Stack

Languages: TypeScript, Python, SQL, Bash
Frontend: React, Next.js, Tailwind CSS, shadcn/ui
Backend: Node.js, FastAPI, tRPC, REST APIs, Prisma
Databases: PostgreSQL, SQLite
Tools: Git, Docker, Vercel, CI/CD pipelines

---

## Frequently Asked Questions

Q: How does pricing work?
A: No fixed packages. Every project has unique scope and deadlines. Pricing is flexible and negotiable — whether milestone-based, fixed-scope, or dedicated sprint.

Q: Do clients get full source code ownership?
A: Yes. 100% intellectual property and git repository access transferred on milestone completion.

Q: What is the fastest way to contact ${person.name}?
A: Telegram @Kanferneo. Also available via email (saffanakbar942@gmail.com) and Cal.com (https://cal.com/saffan) for a 15-minute call.

Q: Does ${person.name} work with international clients?
A: Yes. While based in India, ${person.name} works with clients worldwide across all timezones.
`;

  return new Response(text, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
