import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { PostCard } from "@/components/blog/post-card";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { person } from "@/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical articles on software engineering, Next.js, FastAPI, database design, and web performance — written by a full-stack engineer in Srinagar, India.",
  keywords: [
    "software engineering blog",
    "web development articles",
    "Next.js tutorials",
    "FastAPI Python tutorial",
    "TypeScript tips",
    "web performance optimization",
    "full-stack developer blog India",
    "React developer blog",
    "PostgreSQL tips",
    "Docker tutorial",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: `Blog — ${person.name}`,
    description:
      "Practical articles on Next.js, FastAPI, database design, and web performance from a full-stack engineer.",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog — ${person.name}`,
    description:
      "Practical articles on Next.js, FastAPI, database design, and web performance from a full-stack engineer.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [latest, ...rest] = posts;

  return (
    <>
      <PageHeader
        label="blog"
        title="Notes from the workshop"
        description="Long-form writing on the things I keep getting asked about: performance work that pays off, TypeScript in anger, and the git workflows that survive small teams."
      />

      <section className="site-container section-y-sm">
        <div className="mb-6 flex items-center justify-between">
          <p className="label-mono text-xs text-muted-foreground">
            {posts.length} articles published
          </p>
          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono inline-flex items-center gap-1.5 text-xs text-amber-fg underline-offset-4 hover:underline"
          >
            <span className="size-1.5 rounded-full bg-amber-fg" />
            RSS feed ↗
          </a>
        </div>

        {latest && (
          <article className="group">
            <Link
              href={`/blog/${latest.slug}`}
              aria-label={`${latest.title} — ${latest.description}`}
              className="card-panel lift flex flex-col p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:p-8"
            >
              <p className="label-mono mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-muted-foreground">
                <span className="label-mono flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-amber-fg">
                  latest
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3" aria-hidden />
                  <time dateTime={latest.date}>{formatDate(latest.date)}</time>
                </span>
                <span aria-hidden>·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3" aria-hidden />
                  {latest.readingMinutes} min read
                </span>
              </p>

              <h2 className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-balance sm:text-3xl">
                {latest.title}
              </h2>
              <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                {latest.description}
              </p>
              <p className="label-mono mt-5 flex items-center gap-1 text-muted-foreground">
                read the post
                <span className="text-amber-fg transition-transform group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </p>
            </Link>
          </article>
        )}

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </>
  );
}
