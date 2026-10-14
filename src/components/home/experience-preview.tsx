import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { experience } from "@/content";

export function ExperiencePreview() {
  const recent = experience.slice(0, 2);

  return (
    <section aria-labelledby="log-heading" className="scroll-mt-24 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 section-y">
        <SectionHeading
          label="experience"
          title="Recent milestones"
          id="log-heading"
        />

        <div className="card-panel overflow-hidden rounded-lg border border-border bg-[#0d0d10] p-5 sm:p-7 font-mono text-sm text-[#dcdcd4]">
          <div className="mb-5 flex items-center justify-between border-b border-[#26262c] pb-3 text-xs text-[#8a8a93]">
            <div className="flex items-center gap-2">
              <span className="text-amber-fg font-bold">$</span>
              <span className="text-[#f2f1ec] font-semibold">git log</span>
              <span className="text-chart-2">-n 2</span>
            </div>
            <span className="text-[#8a8a93]/60 hidden sm:inline">HEAD → main</span>
          </div>

          <div className="space-y-4">
            {recent.map((e) => (
              <div key={e.hash} className="group">
                <div className="flex items-start gap-3">
                  <span className="select-none font-bold text-chart-2 shrink-0 pt-0.5" aria-hidden>
                    *
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <span className="font-semibold text-amber-fg tracking-wide">
                        {e.hash}
                      </span>
                      {e.ref && (
                        <span className="font-medium text-chart-2">
                          ({e.ref})
                        </span>
                      )}
                      <span className="font-semibold text-[#f2f1ec]">
                        {e.role}
                      </span>
                      <span className="text-[#8a8a93]">
                        @ <span className="text-[#dcdcd4]">{e.company}</span>
                      </span>
                      <span className="text-xs text-[#8a8a93] sm:ml-auto">
                        [{e.period}]
                      </span>
                    </div>
                    {e.points[0] && (
                      <p className="mt-1.5 flex items-start gap-2 text-xs text-[#8a8a93] leading-relaxed">
                        <span className="select-none text-chart-2 font-bold shrink-0" aria-hidden>
                          ❯
                        </span>
                        <span>{e.points[0]}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t border-[#26262c] pt-3 text-xs">
            <Link
              href="/experience"
              className="group inline-flex items-center gap-2 text-[#8a8a93] transition-colors hover:text-[#f2f1ec]"
            >
              <span className="text-amber-fg font-bold">$</span> git log
              <ArrowRight
                className="size-3 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
