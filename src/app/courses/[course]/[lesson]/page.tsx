import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Crumbs } from "@/components/layout/crumbs";
import { Markdown } from "@/components/blog/markdown";
import { VideoEmbed } from "@/components/courses/video-embed";
import { CourseDiagram } from "@/components/courses/diagrams/course-diagram";
import { CourseModuleNavigator } from "@/components/courses/course-module-navigator";
import { getAllCourses, getLesson } from "@/lib/courses";
import { person } from "@/content";

export function generateStaticParams() {
  const courses = getAllCourses();
  return courses.flatMap((c) =>
    c.lessons.map((l) => ({
      course: c.slug,
      lesson: l.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ course: string; lesson: string }>;
}): Promise<Metadata> {
  const { course: courseSlug, lesson: lessonSlug } = await params;
  const data = getLesson(courseSlug, lessonSlug);
  if (!data) return { title: "Lesson not found" };

  const { lesson, course } = data;
  const pageUrl = `/courses/${course.slug}/${lesson.slug}`;

  return {
    title: `${lesson.title} | ${course.title}`,
    description: lesson.description,
    keywords: [
      ...lesson.tags,
      course.title,
      `${course.creator.name} tutorial`,
      "backend engineering from first principles",
      "verbatim transcript",
      "architecture notes",
      `${person.name} courses`,
    ],
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "article",
      title: `${lesson.title} | ${course.title}`,
      description: lesson.description,
      url: pageUrl,
      publishedTime: `${lesson.publishedAt}T00:00:00Z`,
      authors: [person.name, course.creator.name],
      tags: [...lesson.tags],
      siteName: `${person.name} | ${person.role}`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: lesson.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${lesson.title} | ${course.title}`,
      description: lesson.description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ course: string; lesson: string }>;
}) {
  const { course: courseSlug, lesson: lessonSlug } = await params;
  const data = getLesson(courseSlug, lessonSlug);
  if (!data) notFound();

  const { lesson, course, prev, next } = data;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: lesson.title,
    description: lesson.description,
    datePublished: `${lesson.publishedAt}T00:00:00Z`,
    author: [
      {
        "@type": "Person",
        name: person.name,
      },
      {
        "@type": "Person",
        name: course.creator.name,
        sameAs: course.creator.channelUrl,
      },
    ],
    isPartOf: {
      "@type": "Course",
      name: course.title,
      url: `/courses/${course.slug}`,
    },
    publisher: {
      "@type": "Person",
      name: person.name,
      url: `https://${person.domain}`,
    },
    image: `https://${person.domain}/opengraph-image`,
    inLanguage: "en-US",
    keywords: lesson.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="site-container section-y-sm space-y-8">
        {/* Navigation Breadcrumbs & Back Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 border-b border-border/60 pb-3">
          <Crumbs
            items={[
              { label: "~", href: "/" },
              { label: "courses", href: "/courses" },
              { label: "backend", href: `/courses/${course.slug}` },
              { label: `module ${lesson.order.toString().padStart(2, "0")}` },
            ]}
          />
          <Link
            href={`/courses/${course.slug}`}
            className="label-mono self-start sm:self-auto inline-flex items-center gap-1 text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground shrink-0"
          >
            <ArrowLeft className="size-3" aria-hidden /> all modules
          </Link>
        </div>

        {/* Lesson Header - Title Only */}
        <header className="border-b border-border pb-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {lesson.title}
          </h1>
        </header>

        {/* Video Embed Companion */}
        {lesson.videoUrl && (
          <VideoEmbed
            youtubeId={lesson.youtubeId}
            videoUrl={lesson.videoUrl}
            title={lesson.title}
          />
        )}

        {/* Visual Architecture Diagram (if present) */}
        {lesson.diagramType && lesson.diagramType !== "none" && (
          <CourseDiagram type={lesson.diagramType} />
        )}

        {/* Full-Width Transcript & Markdown Body */}
        <div className="min-w-0">
          <Markdown body={lesson.body} />
        </div>

        {/* Next / Previous Lesson Navigation - Small & Sleek */}
        <nav aria-label="Lesson navigation" className="border-t border-border pt-6">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            {prev ? (
              <Button asChild variant="outline" size="sm" className="h-8 gap-1.5 px-3 text-xs">
                <Link href={`/courses/${course.slug}/${prev.slug}`}>
                  <ArrowLeft className="size-3" />
                  <span className="hidden sm:inline text-muted-foreground">Prev:</span>
                  <span className="truncate max-w-[180px] font-semibold">{prev.order.toString().padStart(2, "0")}. {prev.title.replace(/^\d+\.\s*/, "")}</span>
                </Link>
              </Button>
            ) : (
              <div />
            )}

            <Button asChild variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:text-foreground">
              <Link href={`/courses/${course.slug}`}>
                All Modules
              </Link>
            </Button>

            {next ? (
              <Button asChild variant="outline" size="sm" className="h-8 gap-1.5 px-3 text-xs">
                <Link href={`/courses/${course.slug}/${next.slug}`}>
                  <span className="hidden sm:inline text-muted-foreground">Next:</span>
                  <span className="truncate max-w-[180px] font-semibold">{next.order.toString().padStart(2, "0")}. {next.title.replace(/^\d+\.\s*/, "")}</span>
                  <ArrowRight className="size-3" />
                </Link>
              </Button>
            ) : (
              <div />
            )}
          </div>
        </nav>

        {/* Floating Quick Drawer Navigator (Compact bottom-right) */}
        <CourseModuleNavigator
          lessons={course.lessons}
          courseSlug={course.slug}
          currentLessonSlug={lesson.slug}
        />
      </article>
    </>
  );
}
