import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { extractHeadings, type Heading } from "@/lib/blog";

export interface Creator {
  name: string;
  handle: string;
  channelUrl: string;
  avatarUrl?: string;
  bio?: string;
  discordUrl?: string;
}

export interface Lesson {
  slug: string;
  courseSlug: string;
  title: string;
  description: string;
  order: number;
  duration: string;
  videoUrl: string;
  youtubeId?: string;
  tags: readonly string[];
  publishedAt: string;
  diagramType?: "backend-roadmap" | "fiber-tree" | "dom-pipeline" | "event-loop" | "cache-flow" | "none";
  body: string;
  readingMinutes: number;
  headings: Heading[];
  status?: "published" | "upcoming";
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  track: "frontend" | "backend" | "fullstack" | "system-design";
  level: "Beginner" | "Intermediate" | "Advanced";
  creator: Creator;
  lessons: Lesson[];
  totalReadingMinutes: number;
  badge?: string;
  playlistUrl?: string;
  totalEpisodes?: number;
}

const COURSES_DIR = path.join(process.cwd(), "src", "content", "courses");

function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function parseLesson(courseSlug: string, file: string): Lesson {
  const filePath = path.join(COURSES_DIR, courseSlug, file);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const cleanSlug = file.replace(/\.md$/, "");
  const orderMatch = /^(\d+)-/.exec(cleanSlug);
  const parsedOrder = orderMatch ? parseInt(orderMatch[1], 10) : Number(data.order ?? 1);

  return {
    slug: cleanSlug,
    courseSlug,
    title: String(data.title ?? cleanSlug),
    description: String(data.description ?? ""),
    order: parsedOrder,
    duration: String(data.duration ?? `${readingMinutes(content)} min read`),
    videoUrl: String(data.videoUrl ?? ""),
    youtubeId: data.youtubeId ? String(data.youtubeId) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    publishedAt: data.publishedAt instanceof Date
      ? data.publishedAt.toISOString().slice(0, 10)
      : String(data.publishedAt ?? ""),
    diagramType: data.diagramType as Lesson["diagramType"],
    body: content.trim(),
    readingMinutes: readingMinutes(content),
    headings: extractHeadings(content),
    status: (data.status as "published" | "upcoming") ?? (content.trim().length > 100 ? "published" : "upcoming"),
  };
}

export function getAllCourses(): Course[] {
  if (!fs.existsSync(COURSES_DIR)) return [];

  const courseFolders = fs
    .readdirSync(COURSES_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith("_"));

  const courses: Course[] = [];

  for (const folder of courseFolders) {
    const courseSlug = folder.name;
    const courseMetaPath = path.join(COURSES_DIR, courseSlug, "course.json");
    if (!fs.existsSync(courseMetaPath)) continue;

    try {
      const metaRaw = fs.readFileSync(courseMetaPath, "utf8");
      const meta = JSON.parse(metaRaw);

      const files = fs
        .readdirSync(path.join(COURSES_DIR, courseSlug))
        .filter((f) => f.endsWith(".md") && !f.startsWith("_"));

      const lessons = files
        .map((f) => parseLesson(courseSlug, f))
        .sort((a, b) => a.order - b.order);

      const totalReadingMinutes = lessons.reduce(
        (sum, l) => sum + l.readingMinutes,
        0
      );

      courses.push({
        slug: courseSlug,
        title: meta.title,
        description: meta.description,
        track: meta.track,
        level: meta.level ?? "Intermediate",
        creator: meta.creator,
        lessons,
        totalReadingMinutes,
        badge: meta.badge,
        playlistUrl: meta.playlistUrl,
        totalEpisodes: meta.totalEpisodes ?? lessons.length,
      });
    } catch {
      // Continue if a course metadata fails to parse
    }
  }

  return courses.sort((a, b) => {
    if (a.slug === "backend-engineering-from-first-principles") return -1;
    if (b.slug === "backend-engineering-from-first-principles") return 1;
    return b.lessons.length - a.lessons.length;
  });
}

export function getCourse(slug: string): Course | undefined {
  return getAllCourses().find((c) => c.slug === slug);
}

export function getAllLessons(): Lesson[] {
  const courses = getAllCourses();
  return courses.flatMap((c) => c.lessons);
}

export function getLesson(
  courseSlug: string,
  lessonSlug: string
): { lesson: Lesson; course: Course; prev?: Lesson; next?: Lesson } | undefined {
  const course = getCourse(courseSlug);
  if (!course) return undefined;

  const lessonIndex = course.lessons.findIndex((l) => l.slug === lessonSlug);
  if (lessonIndex === -1) return undefined;

  const lesson = course.lessons[lessonIndex];
  const prev = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : undefined;
  const next =
    lessonIndex < course.lessons.length - 1
      ? course.lessons[lessonIndex + 1]
      : undefined;

  return { lesson, course, prev, next };
}

export function getCoursesByTrack(track: string): Course[] {
  if (track === "all") return getAllCourses();
  return getAllCourses().filter((c) => c.track === track);
}
