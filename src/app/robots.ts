import type { MetadataRoute } from "next";
import { person } from "@/content";

export default function robots(): MetadataRoute.Robots {
  const base = `https://${person.domain}`;
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
