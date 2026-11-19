import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Youtube, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Crumbs } from "@/components/layout/crumbs";
import { LessonSyllabus } from "@/components/courses/lesson-syllabus";
import { getAllCourses, getCourse } from "@/lib/courses";
import { person } from "@/content";

export function generateStaticParams() {
  return getAllCourses().map((c) => ({ course: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ course: string }>;
}): Promise<Metadata> {
  const { course: courseSlug } = await params;
  const course = getCourse(courseSlug);
  if (!course) return { title: "Course not found" };

  const pageUrl = `/courses/${course.slug}`;

  return {
    title: `${course.title} — Course Breakdown`,
    description: course.description,
    keywords: [
      course.title,
      `${course.track} course`,
      `${course.creator.name} course`,
      "software engineering visual guide",
      "architecture diagrams",
      `${person.name} courses`,
    ],
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "website",
      title: `${course.title} | ${person.name}`,
      description: course.description,
      url: pageUrl,
      siteName: `${person.name} | ${person.role}`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} | ${person.name}`,
      description: course.description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course: courseSlug } = await params;
  const course = getCourse(courseSlug);
  if (!course) notFound();

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Person",
      name: course.creator.name,
      sameAs: course.creator.channelUrl,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: `PT${course.totalReadingMinutes}M`,
    },
    numberOfCredits: course.lessons.length,
    educationalLevel: course.level,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      <article className="site-container section-y-sm space-y-8">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 border-b border-border/60 pb-3">
            <Crumbs
              items={[
                { label: "~", href: "/" },
                { label: "courses", href: "/courses" },
                { label: "backend" },
              ]}
            />
            <Link
              href="/courses"
              className="label-mono self-start sm:self-auto inline-flex items-center gap-1 text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground shrink-0"
            >
              <ArrowLeft className="size-3" aria-hidden /> all courses
            </Link>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              {course.title}
            </h1>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="shrink-0 self-start sm:self-auto border-red-500/30 bg-card font-mono text-xs hover:border-red-500 hover:bg-red-500/10 text-foreground"
            >
              <a
                href={course.creator.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Youtube className="size-4 text-red-500 shrink-0" />
                <span className="truncate">Original by {course.creator.name}</span>
                <ExternalLink className="size-3 text-muted-foreground shrink-0" />
              </a>
            </Button>
          </div>
        </div>

        {/* Syllabus Section */}
        <section aria-label="Course curriculum">
          <LessonSyllabus lessons={course.lessons} courseSlug={course.slug} />
        </section>

        {/* Back Link */}
        <div className="border-t border-border pt-6">
          <Button asChild variant="ghost" size="sm" className="font-mono text-xs text-muted-foreground">
            <Link href="/courses">
              <ArrowLeft className="mr-2 size-3.5" /> Back to all courses
            </Link>
          </Button>
        </div>
      </article>
    </>
  );
}
