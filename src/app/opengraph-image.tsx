import { ImageResponse } from "next/og";
import { person } from "@/content";

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
          padding: 72,
          fontFamily: "monospace",
        }}
      >
        {/* wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 30,
            color: "#f5b638",
          }}
        >
          <span>❯</span>
          <span style={{ color: "#f2f1ec" }}>{person.firstName}</span>
          <span style={{ color: "#8a8a93" }}>.dev</span>
        </div>

        {/* the pitch */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>
            {person.name}
          </div>
          <div style={{ fontSize: 40, color: "#8a8a93" }}>{person.role}</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 26,
              color: "#4cc38a",
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                backgroundColor: "#4cc38a",
              }}
            />
            {person.domain}
          </div>
        </div>

        {/* amber baseline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          <div style={{ width: 120, height: 6, backgroundColor: "#f5b638" }} />
        </div>
      </div>
    ),
    size
  );
}
