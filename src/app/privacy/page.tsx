import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, EyeOff, Server, Mail } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { person } from "@/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Owais's portfolio and software engineering services. Transparent disclosure on data handling, analytics, and contact security.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy Policy | ${person.name}`,
    description: "Transparent data handling, analytics disclosure, and contact privacy.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  const lastUpdated = "October 2026";

  return (
    <>
      <PageHeader
        label="legal & compliance"
        title="Privacy Policy"
        description="Plain-English disclosure of how your information is handled when you visit this website, submit a project inquiry, or message me."
      />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 section-y-sm">
        <div className="card-panel p-6 sm:p-10 space-y-8 font-sans text-sm leading-relaxed text-muted-foreground">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <span className="label-mono flex items-center gap-2 text-amber-fg">
              <ShieldCheck className="size-4" />
              $ cat /etc/privacy.md
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              Last updated: {lastUpdated}
            </span>
          </div>

          <div>
            <h2 className="font-mono text-lg font-bold text-foreground flex items-center gap-2">
              <Lock className="size-4 text-amber-fg" />
              1. Information Collected
            </h2>
            <p className="mt-2">
              I respect your privacy and only collect information you voluntarily provide:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>
                <strong className="text-foreground">Contact Form Inquiries:</strong> When you submit the contact form, I collect your name, email address, and message to respond to your project request.
              </li>
              <li>
                <strong className="text-foreground">Direct Communications:</strong> When you reach out via Telegram (@Kanferneo) or book a call on Cal.com, messages and calendar bookings are processed through those respective platforms.
              </li>
            </ul>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-mono text-lg font-bold text-foreground flex items-center gap-2">
              <EyeOff className="size-4 text-amber-fg" />
              2. Zero Invasive Tracking & Cookie Policy
            </h2>
            <p className="mt-2">
              This site does <strong className="text-foreground">not</strong> use advertising cookies, marketing pixels (like Meta Pixel or Google Ads), or invasive session replay trackers.
            </p>
            <p className="mt-2">
              I utilize <strong className="text-foreground">Vercel Web Analytics</strong>, which is a privacy-first, cookie-free analytics service. It aggregates general metrics (total page views, broad geographic country, browser type) without tracking individual identities or collecting personally identifiable information (PII).
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-mono text-lg font-bold text-foreground flex items-center gap-2">
              <Server className="size-4 text-amber-fg" />
              3. Data Usage & Confidentiality
            </h2>
            <p className="mt-2">
              Any information you share regarding your company, software requirements, or intellectual property is treated with strict confidentiality:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Your contact information is never sold, leased, or shared with third-party data brokers.</li>
              <li>Project briefs and business ideas are kept confidential under professional engineering ethics (and formal Non-Disclosure Agreements where requested).</li>
              <li>Form messages are stored securely in a private database solely for client communication.</li>
            </ul>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-mono text-lg font-bold text-foreground flex items-center gap-2">
              <Mail className="size-4 text-amber-fg" />
              4. Your Rights & Contact Information
            </h2>
            <p className="mt-2">
              You have the right to request deletion of any contact messages you have sent. To request data deletion or ask questions about this policy, you can reach out directly:
            </p>
            <p className="mt-3 font-mono text-xs text-foreground">
              Email:{" "}
              <a href={`mailto:${person.email}`} className="text-amber-fg underline hover:text-foreground">
                {person.email}
              </a>
              <br />
              Telegram:{" "}
              <a
                href={person.telegram || "https://t.me/Kanferneo"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#229ED9] underline hover:text-foreground"
              >
                @Kanferneo
              </a>
            </p>
          </div>

          <div className="border-t border-border pt-6 flex justify-between items-center">
            <Link
              href="/"
              className="label-mono inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              back to home
            </Link>
            <Link
              href="/terms"
              className="label-mono text-amber-fg transition-colors hover:underline"
            >
              view terms of service →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
