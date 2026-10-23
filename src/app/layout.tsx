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
  person.role.toLowerCase(),
  "software engineer",
  "web developer",
  "full-stack developer",
  "web development",
  "ui/ux design",
  "ui/ux developer",
  "design systems",
  "frontend developer",
  "Next.js developer",
  "React developer",
  "TypeScript",
  "freelance web developer",
  "portfolio",
];

if (person.location) {
  const { city, country } = person.location;
  keywords.push(
    `software engineer in ${city}`,
    `web developer in ${city}`,
    `ui ux designer in ${city}`,
    `software engineer ${country}`,
    `web developer ${country}`,
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${person.name} — ${person.role}`,
    template: `%s | ${person.name}`,
  },
  description: person.tagline,
  keywords,
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  publisher: person.name,
  category: "technology",
  alternates: {
    canonical: siteUrl,
    languages: {
      en: siteUrl,
      "x-default": siteUrl,
    },
    types: {
      "application/rss+xml": `${siteUrl}/rss.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["en_US", "en_GB"],
    url: siteUrl,
    siteName: `${person.name} — ${person.role}`,
    title: `${person.name} — ${person.role}`,
    description: person.tagline,
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${person.name} — ${person.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name} — ${person.role}`,
    description: person.tagline,
    creator: `@${person.handle}`,
    images: [`${siteUrl}/opengraph-image`],
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
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  alternateName: person.handle,
  jobTitle: person.role,
  email: `mailto:${person.email}`,
  url: siteUrl,
  sameAs: socials.map((s) => s.href),
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
    "Prisma",
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
  name: `${person.name} — ${person.role}`,
  url: siteUrl,
  description: person.tagline,
  inLanguage: "en",
  publisher: { "@type": "Person", name: person.name, url: siteUrl },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${person.name} — Software Engineering & Web Development`,
  description: person.tagline,
  url: siteUrl,
  email: `mailto:${person.email}`,
  provider: { "@type": "Person", name: person.name, url: siteUrl },
  serviceType: services.map((s) => s.name),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.description,
      },
    })),
  },
  ...(person.location
    ? {
        areaServed: [
          { "@type": "City", name: person.location.city },
          { "@type": "Country", name: person.location.country },
        ],
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
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

