import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle2, GitBranch, Shield, Handshake } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { person } from "@/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service and Client Engagement for Owais's software engineering and freelance development services.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `Terms of Service | ${person.name}`,
    description: "Terms of engagement, intellectual property transfer, and milestone standards.",
    url: "/terms",
  },
};

export default function TermsPage() {
  const lastUpdated = "October 2026";

  return (
    <>
      <PageHeader
        label="legal & collaboration"
        title="Terms of Service"
        description="Standard terms of engagement for client software development, milestone delivery, and intellectual property ownership."
      />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 section-y-sm">
        <div className="card-panel p-6 sm:p-10 space-y-8 font-sans text-sm leading-relaxed text-muted-foreground">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <span className="label-mono flex items-center gap-2 text-amber-fg">
              <FileText className="size-4" />
              $ cat /etc/terms.md
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              Last updated: {lastUpdated}
            </span>
          </div>

          <div>
            <h2 className="font-mono text-lg font-bold text-foreground flex items-center gap-2">
              <Handshake className="size-4 text-amber-fg" />
              1. Engagement & Scope
            </h2>
            <p className="mt-2">
              All freelance and contract engineering services are performed according to mutually agreed milestones, project scopes, or sprint deliverables.
            </p>
            <p className="mt-2">
              Before commencing work, we establish clear acceptance criteria, timeline expectations, and milestone checkpoints so both parties have complete transparency.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-mono text-lg font-bold text-foreground flex items-center gap-2">
              <GitBranch className="size-4 text-chart-2" />
              2. 100% Intellectual Property & Code Ownership
            </h2>
            <p className="mt-2">
              Upon receipt of payment for a completed milestone or project:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>
                <strong className="text-foreground">Full IP Transfer:</strong> You own 100% of the custom source code, documentation, assets, and database architectures created for your project.
              </li>
              <li>
                <strong className="text-foreground">Repository Access:</strong> Full administrative ownership of the GitHub/GitLab repository is transferred directly to your organization.
              </li>
              <li>
                <strong className="text-foreground">No Lock-In:</strong> Code is written using standard, well-documented frameworks (Next.js, FastAPI, Prisma, PostgreSQL) so any competent engineer can maintain or extend it.
              </li>
            </ul>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-mono text-lg font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="size-4 text-amber-fg" />
              3. Milestone-Based Payments & Invoicing
            </h2>
            <p className="mt-2">
              To ensure mutual trust, projects are structured into discrete milestones:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Work is verified on live staging environments prior to final deployment.</li>
              <li>Payments are made upon approval of milestone deliverables.</li>
              <li>Accepted payment methods include international bank transfers, Wise, Stripe invoices, or mutually agreed methods.</li>
            </ul>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-mono text-lg font-bold text-foreground flex items-center gap-2">
              <Shield className="size-4 text-amber-fg" />
              4. 30-Day Bug Warranty & Post-Launch Support
            </h2>
            <p className="mt-2">
              I stand behind the quality of my work. Every delivered project includes a <strong className="text-foreground">30-day bug-fixing warranty</strong> post-deployment.
            </p>
            <p className="mt-2">
              Any unexpected bugs or discrepancies against the agreed scope during this period will be resolved promptly at no extra charge. Long-term maintenance and retainer arrangements are available upon request.
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
              href="/privacy"
              className="label-mono text-amber-fg transition-colors hover:underline"
            >
              view privacy policy →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
