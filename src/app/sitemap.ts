import type { MetadataRoute } from "next";
import { pages, person, projects } from "@/content";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const protocol = person.domain.includes("localhost") ? "http" : "https";
  const base = `${protocol}://${person.domain}`;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base },
    ...pages
      .filter((page) => page.href.startsWith("/") && !page.href.startsWith("/#"))
      .map((page) => ({ url: `${base}${page.href}` })),
    { url: `${base}/uses` },
    { url: `${base}/now` },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${base}/projects/${project.name}`,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00Z`),
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
