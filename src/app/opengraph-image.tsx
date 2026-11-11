import { ImageResponse } from "next/og";
import { person } from "@/content";

// Root OpenGraph image — 1200×630, PNG
// Used by homepage, and as the fallback for pages without a custom OG image.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${person.name} — ${person.role}`;

export default function OpenGraphImage() {
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
          padding: "64px 72px",
          fontFamily: "monospace",
        }}
      >
        {/* wordmark / breadcrumb */}
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
          <span style={{ color: "#f2f1ec" }}>{person.firstName}</span>
          <span style={{ color: "#8a8a93" }}>.dev</span>
        </div>

        {/* main pitch */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 90,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1,
              color: "#f2f1ec",
            }}
          >
            {person.name}
          </div>
          <div style={{ fontSize: 38, color: "#8a8a93", lineHeight: 1.2 }}>
            {person.role}
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#c8c7c0",
              maxWidth: 820,
              lineHeight: 1.4,
              marginTop: 4,
            }}
          >
            {person.tagline}
          </div>
        </div>

        {/* footer — domain + amber accent */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 100, height: 5, backgroundColor: "#f5b638" }} />
            <span style={{ fontSize: 24, color: "#4cc38a" }}>
              ● {person.domain}
            </span>
          </div>
          <div style={{ display: "flex", gap: 24, fontSize: 22, color: "#8a8a93" }}>
            <span>Next.js</span>
            <span style={{ color: "#f5b638" }}>·</span>
            <span>React</span>
            <span style={{ color: "#f5b638" }}>·</span>
            <span>FastAPI</span>
            <span style={{ color: "#f5b638" }}>·</span>
            <span>PostgreSQL</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
