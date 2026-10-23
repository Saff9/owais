import type { MetadataRoute } from "next";
import { person } from "@/content";

export default function robots(): MetadataRoute.Robots {
  const isLocal = person.domain.includes("localhost");
  const protocol = isLocal ? "http" : "https";
  const base = `${protocol}://${person.domain}`;

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
