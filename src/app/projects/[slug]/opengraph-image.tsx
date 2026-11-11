import { ImageResponse } from "next/og";
import { getProject, projects, person } from "@/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.name }));
}

export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  const title = project?.name ?? slug;
  const tagline = project?.tagline ?? "Engineering Case Study";
  const stack = project?.stack?.slice(0, 4) ?? [];
  const year = project?.year ?? "2026";
  const category = project?.category ?? "Web Application";

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
        {/* top breadcrumb bar */}
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
            <span style={{ color: "#8a8a93" }}>.dev / projects</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              color: "#f5b638",
            }}
          >
            <span>{category}</span>
            <span>·</span>
            <span>{year}</span>
          </div>
        </div>

        {/* title & tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 74,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1,
              color: "#f2f1ec",
            }}
          >
            <span style={{ color: "#f5b638" }}>./</span>
            <span>{title}</span>
          </div>

          <div
            style={{
              fontSize: 28,
              color: "#c8c7c0",
              maxWidth: 950,
              lineHeight: 1.35,
            }}
          >
            {tagline}
          </div>

          {/* stack pills */}
          {stack.length > 0 && (
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              {stack.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 20,
                    color: "#f2f1ec",
                    backgroundColor: "#1a1a1f",
                    border: "1px solid #27272a",
                    padding: "6px 16px",
                    borderRadius: 6,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #27272a",
            paddingTop: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 22,
              color: "#8a8a93",
            }}
          >
            <div style={{ width: 80, height: 4, backgroundColor: "#f5b638" }} />
            <span>Built by {person.name}</span>
          </div>
          <div style={{ fontSize: 22, color: "#4cc38a" }}>
            {person.domain}
          </div>
        </div>
      </div>
    ),
    size
  );
}
