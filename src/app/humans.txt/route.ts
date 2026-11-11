import { person } from "@/content";

export const dynamic = "force-static";

export function GET() {
  const text = `/* TEAM */
  Developer & Designer: ${person.name}
  Contact: ${person.email}
  Telegram: @Kanferneo
  GitHub: https://github.com/saff9
  Location: Srinagar, Jammu & Kashmir, India

/* SITE */
  Last update: ${new Date().toISOString().split("T")[0]}
  Language: English
  Doctype: HTML5
  IDE: VS Code + Antigravity
  Framework: Next.js ${process.env.NEXT_PUBLIC_NEXT_VERSION ?? "16"} (App Router)
  Hosting: Vercel
`;

  return new Response(text, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400",
    },
  });
}
