import type { MetadataRoute } from "next";
import { person } from "@/content";

export default function robots(): MetadataRoute.Robots {
  const isLocal = person.domain.includes("localhost");
  const protocol = isLocal ? "http" : "https";
  const base = `${protocol}://${person.domain}`;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/static/"],
      },
      {
        // Allow AI crawlers to index blog + projects + about + courses
        // so they can reference this site in AI-generated answers
        userAgent: "GPTBot",
        allow: ["/", "/blog/", "/courses/", "/projects/", "/about", "/uses", "/now", "/llms.txt", "/llms-full.txt"],
        disallow: ["/api/", "/contact"],
      },
      {
        userAgent: "Claude-Web",
        allow: ["/", "/blog/", "/courses/", "/projects/", "/about", "/uses", "/now", "/llms.txt", "/llms-full.txt"],
        disallow: ["/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/blog/", "/courses/", "/projects/", "/about", "/llms.txt", "/llms-full.txt"],
        disallow: ["/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
