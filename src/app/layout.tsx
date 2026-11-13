import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/system/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { person, services, socials, seo, pages } from "@/content";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

const isLocal = person.domain.includes("localhost");
const siteUrl = `${isLocal ? "http" : "https"}://${person.domain}`;

const keywords: string[] = [
  person.name,
  "Owais",
  "Saffan Akbar",
  person.role.toLowerCase(),
  "software engineer",
  "web developer",
  "full-stack developer",
  "full stack developer India",
  "web development",
  "frontend developer",
  "backend developer",
  "Next.js developer",
  "React developer",
  "FastAPI developer",
  "Node.js developer",
  "TypeScript developer",
  "freelance web developer",
  "hire web developer",
  "hire software engineer",
  "custom web app development",
  "backend API development",
  "CMS panel development",
  "MVP development",
  "portfolio",
];

if (person.location) {
  const { city, region, country } = person.location;
  keywords.push(
    `software engineer in ${city}`,
    `web developer in ${city}`,
    `freelance developer ${city}`,
    `hire developer ${city}`,
    `software engineer ${region}`,
    `web developer ${region}`,
    `software engineer ${country}`,
    `web developer ${country}`,
    `full stack developer ${country}`,
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Full-Stack Developer in Srinagar, India | ${person.name}`,
    template: `%s | ${person.name}`,
  },
  description:
    `${person.name} is a full-stack developer in Srinagar, India, building web apps, APIs, admin dashboards, and MVPs with Next.js, React, and TypeScript.`,
  keywords,
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  publisher: person.name,
  category: "technology",
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": `${siteUrl}/rss.xml`,
      "text/plain": `${siteUrl}/llms.txt`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["en_US", "en_GB"],
    url: siteUrl,
    siteName: `${person.name} — ${person.role}`,
    title: `Full-Stack Developer in Srinagar, India | ${person.name}`,
    description:
      `${person.name} is a full-stack developer in Srinagar, India, building web apps, APIs, admin dashboards, and MVPs with Next.js, React, and TypeScript.`,
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${person.name} — ${person.role} | Portfolio`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Full-Stack Developer in Srinagar, India | ${person.name}`,
    description:
      `${person.name} is a full-stack developer in Srinagar, India, building web apps, APIs, admin dashboards, and MVPs with Next.js, React, and TypeScript.`,
    creator: `@${person.handle}`,
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${person.name} — ${person.role} | Portfolio`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(seo.googleVerification || seo.bingVerification
    ? {
        verification: {
          ...(seo.googleVerification
            ? { google: seo.googleVerification }
            : {}),
          ...(seo.bingVerification
            ? { other: { "msvalidate.01": seo.bingVerification } }
            : {}),
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbfb" },
  ],
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: person.name,
  alternateName: ["Saffan Akbar", "Owais Dar"],
  jobTitle: person.role,
  email: `mailto:${person.email}`,
  url: siteUrl,
  image: `${siteUrl}/opengraph-image`,
  sameAs: [
    "https://github.com/saff9",
    "https://t.me/Kanferneo",
    "https://cal.com/saffan",
    ...socials
      .filter((s) => !s.href.includes("?text="))
      .map((s) => s.href),
  ].filter((v, i, a) => a.indexOf(v) === i),
  knowsLanguage: ["en", "hi", "ur"],
  knowsAbout: [
    "Software engineering",
    "Full-stack web development",
    "UI/UX design",
    "Design systems",
    "Web performance",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "FastAPI",
    "Python",
    "PostgreSQL",
    "Prisma",
    "Docker",
    ...services.map((s) => s.name),
  ],
  ...(person.location
    ? {
        address: {
          "@type": "PostalAddress",
          addressLocality: person.location.city,
          addressRegion: person.location.region,
          addressCountry: person.location.countryCode,
        },
        homeLocation: {
          "@type": "Place",
          name: `${person.location.city}, ${person.location.country}`,
        },
      }
    : {}),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: `${person.name} — ${person.role}`,
  url: siteUrl,
  description: person.tagline,
  inLanguage: "en",
  publisher: { "@type": "Person", "@id": `${siteUrl}/#person`, name: person.name, url: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* llms.txt — discovered by AI crawlers (ChatGPT, Claude, Perplexity, Gemini) */}
        <link rel="llms" type="text/plain" href={`${siteUrl}/llms.txt`} />
        {/* IndieWeb rel=me — links profile pages together for identity verification */}
        <link rel="me" href="https://github.com/saff9" />
        <link rel="me" href="https://t.me/Kanferneo" />
        {/* security.txt — RFC 9116 */}
        <link rel="security-policy" href={`${siteUrl}/.well-known/security.txt`} />
      </head>
      <body
        className={`${grotesk.variable} ${jbMono.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-primary-foreground"
            >
              Skip to content
            </a>

            <Navbar pages={pages} name={person.firstName} />

            <main id="main" className="flex-1">
              {children}
            </main>

            <Footer />
          </div>

          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
