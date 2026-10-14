import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { CopyEmail } from "@/components/shared/copy-email";
import { SocialLinks } from "@/components/contact/social-links";
import { person } from "@/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Hire a software engineer or web developer — roles, freelance projects and architecture reviews. The inbox is open.",
  keywords: [
    "hire software engineer",
    "hire web developer",
    "freelance full-stack developer",
    "UI/UX development",
    "contact",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${person.name}`,
    description:
      "Hire a software engineer or web developer — roles, freelance projects and architecture reviews. The inbox is open.",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${person.name}`,
    description:
      "Hire a software engineer or web developer — roles, freelance projects and architecture reviews. The inbox is open.",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="contact"
        title="Let's build something"
        description="Hiring, freelance, or want a second pair of eyes on an architecture decision? My inbox is open — I reply to everything that isn't crypto spam."
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 section-y-sm">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <ContactForm email={person.email} />
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="label-mono mb-4 flex items-center gap-2 text-muted-foreground">
                <Clock className="size-3.5 text-amber-fg" aria-hidden />
                response time
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Usually within 48 hours, often faster. If it&apos;s urgent,
                put <span className="text-amber-fg">[urgent]</span> in the
                subject and I&apos;ll bump it up the queue.
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
