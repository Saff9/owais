import type { MetadataRoute } from "next";
import { pages, person, projects } from "@/content";
import { getAllPosts } from "@/lib/blog";

// Build date — static pages use this as their last-modified date so
// Google/Bing always see a fresh date after each deployment.
const BUILD_DATE = new Date().toISOString().split("T")[0];

export default function sitemap(): MetadataRoute.Sitemap {
  const isLocal = person.domain.includes("localhost");
  const protocol = isLocal ? "http" : "https";
  const base = `${protocol}://${person.domain}`;

  // Page-level priority tuning
  const pagesPriorityMap: Record<string, number> = {
    "/services": 0.9,
    "/projects": 0.85,
    "/about": 0.8,
    "/contact": 0.8,
    "/blog": 0.75,
    "/experience": 0.7,
  };

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Filter out any anchor-only hrefs (e.g. /#services) — they aren't real URLs
    ...pages
      .filter((p) => p.href.startsWith("/") && !p.href.startsWith("/#"))
      .map((p) => ({
        url: `${base}${p.href}`,
        lastModified: BUILD_DATE,
        changeFrequency: "monthly" as const,
        priority: pagesPriorityMap[p.href] ?? 0.7,
      })),
    {
      url: `${base}/privacy`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${base}/uses`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    },
    {
      url: `${base}/now`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/projects/${p.name}`,
    lastModified: `${p.year}-06-01`,
    changeFrequency: "yearly" as const,
    priority: 0.65,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(`${p.date}T00:00:00Z`).toISOString().split("T")[0],
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
