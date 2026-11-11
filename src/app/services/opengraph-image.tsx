import { ImageResponse } from "next/og";
import { person } from "@/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `Hire ${person.name} — Full-Stack Engineer & Web Developer`;

export default function ServicesOgImage() {
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
        {/* top breadcrumb */}
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
            <span style={{ color: "#8a8a93" }}>.dev / services</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 20,
              color: "#4cc38a",
              backgroundColor: "rgba(76, 195, 138, 0.1)",
              border: "1px solid rgba(76, 195, 138, 0.3)",
              padding: "6px 16px",
              borderRadius: 999,
            }}
          >
            <span>●</span> Available for Projects
          </div>
        </div>

        {/* heading & pitch */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 66,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.1,
              color: "#f2f1ec",
            }}
          >
            Engineering & Delivery
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#f5b638",
              fontWeight: 600,
            }}
          >
            Web Apps · Backend APIs · CMS Panels · Full-Stack MVPs
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#8a8a93",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Scope-based, negotiable pricing with transparent milestones. Fast, accessible, and engineered to last.
          </div>
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
            <span>Telegram: {person.telegramHandle || "@Kanferneo"}</span>
            <span>·</span>
            <span>cal.com/saffan</span>
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#4cc38a",
            }}
          >
            {person.domain}
          </div>
        </div>
      </div>
    ),
    size
  );
}
