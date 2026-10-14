import { experience } from "@/content";

export function GitLog() {
  return (
    <div className="card-panel overflow-hidden rounded-lg border border-border bg-[#0d0d10] p-5 sm:p-7 font-mono text-sm text-[#dcdcd4]">
      <div className="mb-6 flex items-center justify-between border-b border-[#26262c] pb-3 text-xs text-[#8a8a93]">
        <div className="flex items-center gap-2">
          <span className="text-amber-fg font-bold">$</span>
          <span className="text-[#f2f1ec] font-semibold">git log</span>
        </div>
        <span className="hidden sm:inline text-[#8a8a93]/60">{experience.length} milestones</span>
      </div>

      <div className="space-y-6">
        {experience.map((e) => (
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
              </div>
            </div>

            <div className="mt-2.5 space-y-1.5 pl-6">
              {e.points.map((pt) => (
                <div key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-[#8a8a93] hover:text-[#dcdcd4] transition-colors">
                  <span className="select-none text-chart-2 shrink-0 font-bold" aria-hidden>
                    ❯
                  </span>
                  <span className="flex-1 min-w-0">
                    {pt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-[#26262c] pt-4 text-xs text-[#8a8a93] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-amber-fg font-bold">$</span>
          <span>git log --summary</span>
          <span>→</span>
          <span className="text-chart-2 font-semibold">career: {experience.length} milestones, no reverts</span>
        </div>
        <span className="text-[#8a8a93]/60 hidden sm:inline">status: working tree clean</span>
      </div>
    </div>
  );
}
