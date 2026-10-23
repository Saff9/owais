import type { Metadata } from "next";
import { Clock, ArrowUpRight, Video } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { CopyEmail } from "@/components/shared/copy-email";
import { SocialLinks } from "@/components/contact/social-links";
import { TechIcon } from "@/components/tech-icon";
import { Button } from "@/components/ui/button";
import { person } from "@/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Hire a software engineer or web developer — custom web apps, backend APIs, CMS panels, and full-stack products. Discuss scope & negotiable pricing.",
  keywords: [
    "hire software engineer",
    "hire web developer",
    "freelance full-stack developer",
    "custom web apps",
    "backend developer",
    "cms panel developer",
    "contact telegram",
    "contact",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${person.name}`,
    description:
      "Hire a software engineer or web developer — custom web apps, backend APIs, CMS panels, and full-stack products. Discuss scope & negotiable pricing.",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${person.name}`,
    description:
      "Hire a software engineer or web developer — custom web apps, backend APIs, CMS panels, and full-stack products. Discuss scope & negotiable pricing.",
  },
};

export default function ContactPage() {
  const telegramHref = person.telegram || "https://t.me/Kanferneo";
  const calHref = person.calBookingUrl || "https://cal.com/saffan";

  return (
    <>
      <PageHeader
        label="contact"
        title="Let's build something"
        description="Looking for custom web apps, backend APIs, CMS panels, or full-stack MVP development? Reach out directly via Telegram, book a discovery call, or submit the contact form below."
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 section-y-sm">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <ContactForm email={person.email} />
          </div>

          <div className="space-y-4">
            {/* Telegram Direct Chat Highlight */}
            <div className="rounded-xl border border-[#229ED9]/40 bg-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="label-mono flex items-center gap-2 text-[#229ED9]">
                  <TechIcon name="Telegram" className="size-4" />
                  instant chat (fastest)
                </h2>
                <span className="label-mono text-[0.65rem] text-chart-2">
                  ● fast response
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Prefer instant messaging over email? Reach me directly on Telegram to chat about scope, negotiate pricing, or ask questions.
              </p>
              <div className="mt-4">
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-[#229ED9] text-white hover:bg-[#1e8bc0] hover:text-white"
                >
                  <a
                    href={telegramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 font-mono text-xs"
                  >
                    <span>Message on Telegram</span>
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                </Button>
              </div>
            </div>

            {/* 15-Minute Intro Call Card */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="label-mono flex items-center gap-2 text-foreground">
                  <Video className="size-4 text-amber-fg" />
                  15-min discovery call
                </h2>
                <span className="label-mono text-[0.65rem] text-muted-foreground">
                  free
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Prefer talking face-to-face? Book a quick 15-minute voice or video call to discuss your project scope, requirements, and timeline.
              </p>
              <div className="mt-4">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="w-full font-mono text-xs hover:border-amber-fg"
                >
                  <a
                    href={calHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <span>Book 15-Min Intro Call</span>
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="label-mono mb-4 flex items-center gap-2 text-muted-foreground">
                <Clock className="size-3.5 text-amber-fg" aria-hidden />
                response time
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Usually within 24 to 48 hours via email, and significantly faster on Telegram. If it&apos;s urgent,
                mention <span className="text-amber-fg">[urgent]</span> in the
                subject or ping on Telegram.
              </p>
              <div className="mt-4 border-t border-border pt-4">
                <CopyEmail email={person.email} />
              </div>
            </div>

            <h2 className="label-mono pt-2 text-muted-foreground">
              elsewhere
            </h2>
            <SocialLinks />
          </div>
        </div>
      </section>
    </>
  );
}
