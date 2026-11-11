import { ImageResponse } from "next/og";
import { getAllPosts } from "@/lib/blog";
import { person } from "@/content";

// Post OpenGraph image generator — 1200×630, PNG

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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

  const title = post?.title ?? "Notes from the Workshop";
  const tags = post?.tags?.slice(0, 3) ?? [];
  const readTime = post ? `${post.readingMinutes} min read` : "";
  const date = post?.date ?? "";

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
          padding: "60px 72px",
          fontFamily: "monospace",
        }}
      >
        {/* top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 26,
              color: "#8a8a93",
            }}
          >
            <span style={{ color: "#f5b638" }}>❯</span>
            <span style={{ color: "#f2f1ec" }}>{person.firstName}</span>
            <span style={{ color: "#8a8a93" }}>.dev / blog</span>
          </div>
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: 10 }}>
              {tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 20,
                    color: "#f5b638",
                    backgroundColor: "#1a1a1f",
                    padding: "4px 14px",
                    borderRadius: 4,
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* title */}
        <div
          style={{
            display: "flex",
            fontSize: title.length > 55 ? 52 : 64,
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: -1,
            maxWidth: 1050,
            color: "#f2f1ec",
          }}
        >
          {title}
        </div>

        {/* footer meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              fontSize: 24,
              color: "#8a8a93",
            }}
          >
            <div style={{ width: 100, height: 5, backgroundColor: "#f5b638" }} />
            <span>by {person.name}</span>
            {readTime && <span>· {readTime}</span>}
            {date && <span>· {date}</span>}
          </div>
        </div>
      </div>
    ),
    size
  );
}
