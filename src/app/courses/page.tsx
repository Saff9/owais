import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { CourseCard } from "@/components/courses/course-card";
import { TrackFilter } from "@/components/courses/track-filter";
import { getAllCourses, getCoursesByTrack } from "@/lib/courses";
import { person } from "@/content";

export const metadata: Metadata = {
  title: "Courses & Visual Engineering Guides",
  description:
    "Curated video-to-article courses breaking down complex frontend and backend systems into visual architecture diagrams, deep transcripts, and mental models. Featuring video adaptations from Sriniously and other top creators.",
  keywords: [
    "software engineering courses",
    "backend engineering from first principles",
    "system design tutorial",
    "backend roadmap",
    "HTTP protocol internals",
    "Sriniously backend course",
    "Sriniously course transcript",
    "Owais courses",
  ],
  alternates: { canonical: "/courses" },
  openGraph: {
    type: "website",
    title: `Courses & Visual Guides | ${person.name}`,
    description:
      "Video-to-article courses breaking down frontend and backend systems with visual diagrams, code walkthroughs, and creator shoutouts.",
    url: "/courses",
    siteName: `${person.name} | ${person.role}`,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Courses & Visual Engineering Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Courses & Visual Guides | ${person.name}`,
    description:
      "Video-to-article courses breaking down frontend and backend systems with visual diagrams, code walkthroughs, and creator shoutouts.",
    images: ["/opengraph-image"],
  },
};

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ track?: string }>;
}) {
  const { track } = await searchParams;
  const activeTrack = track || "all";
  const courses = getCoursesByTrack(activeTrack);
  const allCourses = getAllCourses();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Visual Software Engineering Courses & Guides",
    description:
      "Curated video-to-article series with interactive architecture diagrams and lesson breakdowns.",
    itemListElement: allCourses.map((c, i) => ({
      "@type": "Course",
      position: i + 1,
      name: c.title,
      description: c.description,
      provider: {
        "@type": "Person",
        name: c.creator.name,
        sameAs: c.creator.channelUrl,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        label="courses"
        title="Visual guides & video breakdowns"
        description="Turning deep engineering videos and transcripts into readable articles with architecture diagrams, code explanations, and respect for original creators."
      />

      <section className="site-container section-y-sm space-y-10">
        {/* Tracks and Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
          <Suspense fallback={null}>
            <TrackFilter activeTrack={activeTrack} />
          </Suspense>

          <span className="label-mono text-xs text-muted-foreground">
            {courses.length} {courses.length === 1 ? "course" : "courses"} in view
          </span>
        </div>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
            <p className="font-mono text-sm">No courses currently in this track.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
