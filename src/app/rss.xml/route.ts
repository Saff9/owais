import { getAllPosts } from "@/lib/blog";
import { person } from "@/content";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const base = `https://${person.domain}`;
  const posts = getAllPosts();
  const buildDate = new Date().toUTCString();

  const items = posts
    .map((p) => {
      const url = `${base}/blog/${p.slug}`;
      const categories = p.tags
        .map((t) => `      <category>${escapeXml(t)}</category>`)
        .join("\n");
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(p.description)}</description>
      <author>${escapeXml(person.email)} (${escapeXml(person.name)})</author>
${categories}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`${person.name} — ${person.role}`)}</title>
    <link>${base}</link>
    <description>${escapeXml(person.tagline)}</description>
    <language>en</language>
    <managingEditor>${escapeXml(person.email)} (${escapeXml(person.name)})</managingEditor>
    <webMaster>${escapeXml(person.email)} (${escapeXml(person.name)})</webMaster>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <ttl>60</ttl>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${base}/opengraph-image</url>
      <title>${escapeXml(`${person.name} — ${person.role}`)}</title>
      <link>${base}</link>
      <width>144</width>
      <height>144</height>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
