import { ImageResponse } from "next/og";
import { getAllPosts } from "@/lib/blog";

// Post OpenGraph image generator

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Article cover";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function PostOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0b0b0d",
          color: "#f2f1ec",
          padding: 72,
          fontFamily: "monospace",
        }}
      >
        {/* breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 28,
            color: "#8a8a93",
          }}
        >
          <span style={{ color: "#f5b638" }}>❯</span>
          <span>blog / {slug}</span>
        </div>

        {/* the title */}
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -1,
            maxWidth: 1000,
          }}
        >
          {post?.title ?? "Notes from the workshop"}
        </div>

        {/* meta + accent */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 26,
            color: "#8a8a93",
          }}
        >
          <div style={{ width: 120, height: 6, backgroundColor: "#f5b638" }} />
          {post ? `${post.readingMinutes} min read · ${post.date}` : "owais.dev"}
        </div>
      </div>
    ),
    size
  );
}
