import type { MetadataRoute } from "next";
import { pages, person, projects } from "@/content";
import { getAllPosts } from "@/lib/blog";
import { getAllCourses, getAllLessons } from "@/lib/courses";

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

  const courseRoutes: MetadataRoute.Sitemap = getAllCourses().map((course) => ({
    url: `${base}/courses/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const lessonRoutes: MetadataRoute.Sitemap = getAllLessons().map((lesson) => ({
    url: `${base}/courses/${lesson.courseSlug}/${lesson.slug}`,
    lastModified: lesson.publishedAt ? new Date(`${lesson.publishedAt}T00:00:00Z`) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes, ...courseRoutes, ...lessonRoutes];
}
