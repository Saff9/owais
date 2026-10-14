import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Crumbs } from "@/components/layout/crumbs";
import { Markdown } from "@/components/blog/markdown";
import { PostCard } from "@/components/blog/post-card";
import { ShareRow } from "@/components/blog/share-row";
import { Toc } from "@/components/blog/toc";
import { PagerNav } from "@/components/shared/pager-nav";
import {
  extractHeadings,
  getAdjacentPosts,
  getAllPosts,
  getPost,
  getRelatedPosts,
} from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { breadcrumbJsonLd } from "@/lib/schema";
import { person } from "@/content";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  const pageUrl = `/blog/${post.slug}`;
  const ogImageUrl = `/blog/${post.slug}/opengraph-image`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: pageUrl,
      publishedTime: post.date,
      authors: [person.name],
      tags: [...post.tags],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);
  const related = getRelatedPosts(slug);

  const headings = extractHeadings(post.body);
  const postUrl = `https://${person.domain}/blog/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    image: `https://${person.domain}/blog/${post.slug}/opengraph-image`,
    author: {
      "@type": "Person",
      name: person.name,
      url: `https://${person.domain}`,
    },
    publisher: {
      "@type": "Person",
      name: person.name,
      url: `https://${person.domain}`,
    },
    mainEntityOfPage: postUrl,
  };

  const crumbs = breadcrumbJsonLd([
    { label: "~", href: "/" },
    { label: "blog", href: "/blog" },
    { label: post.title },
  ]);

  return (
    <article className="dot-grid border-b border-border">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 section-y-sm">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
        />

        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <Crumbs
            items={[
              { label: "~", href: "/" },
              { label: "blog", href: "/blog" },
              { label: post.slug },
            ]}
          />
          <Link
            href="/blog"
            className="label-mono inline-flex items-center gap-1 text-muted-foreground underline-offset-4 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3" aria-hidden /> all posts
          </Link>
        </div>

        <header>
          <p className="label-mono mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3" aria-hidden />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span aria-hidden>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3" aria-hidden />
              {post.readingMinutes} min read
            </span>
            <span aria-hidden>·</span>
            <span className="flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <span key={t} className="text-amber-fg">
                  #{t}
                </span>
              ))}
            </span>
          </p>

          <h1 className="text-post font-semibold tracking-tight text-balance">
            {post.title}
          </h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            {post.description}
          </p>
        </header>

        <hr className="my-10 border-border" />

        <Toc headings={headings} file={`${post.slug}.md`} />

        <Markdown body={post.body} />

        <div className="mt-16">
          <ShareRow url={postUrl} title={post.title} />
        </div>

        <div className="mt-8">
          <PagerNav
            navLabel="More posts"
            prev={prev ? { href: `/blog/${prev.slug}`, label: prev.slug } : undefined}
            next={next ? { href: `/blog/${next.slug}`, label: next.slug } : undefined}
          />
        </div>
      </div>

      {related.length > 0 && (
        <aside
          aria-label="Related posts"
          className="mx-auto max-w-3xl px-4 sm:px-6 section-y-sm"
        >
          <h2 className="label-mono mb-5 flex items-center gap-3 text-muted-foreground">
            <span className="text-amber-fg" aria-hidden>
              $
            </span>
            related notes
            <span aria-hidden className="h-px w-10 bg-border" />
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </aside>
      )}
    </article>
  );
}
