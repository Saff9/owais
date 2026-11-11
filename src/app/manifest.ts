import type { MetadataRoute } from "next";
import { person } from "@/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${person.name} — ${person.role}`,
    short_name: person.firstName,
    description: person.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0d",
    theme_color: "#0b0b0d",
    orientation: "portrait-primary",
    categories: ["technology", "business", "developer"],
    lang: "en",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
