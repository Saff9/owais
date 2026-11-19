export function DomPipelineDiagram() {
  const steps = [
    {
      num: "01",
      title: "JSX Markup",
      type: "Developer code",
      code: '<div class="box"><h1>Title</h1></div>',
      badge: "Transpile",
    },
    {
      num: "02",
      title: "createElement()",
      type: "Compiler output",
      code: 'jsx("div", { className: "box" })',
      badge: "Evaluate",
    },
    {
      num: "03",
      title: "Virtual DOM Node",
      type: "Memory object descriptor",
      code: '{ type: "div", props: { ... } }',
      badge: "Diffing",
    },
    {
      num: "04",
      title: "Reconciliation",
      type: "Heuristic tree diff",
      code: "prevNode !== nextNode -> Flag: Update",
      badge: "Batching",
    },
    {
      num: "05",
      title: "Host DOM Commit",
      type: "Real browser DOM",
      code: "node.textContent = 'New Title'",
      badge: "Paint",
    },
  ];

  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
      <figcaption className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2.5 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-amber-fg" />
          <span className="font-semibold text-foreground">Pipeline Breakdown:</span> From JSX to Browser Pixels
        </span>
        <span className="rounded bg-background px-2 py-0.5 text-[0.7rem] text-muted-foreground border border-border">
          Step-by-Step Flow
        </span>
      </figcaption>

      <div className="p-6 overflow-x-auto">
        <div className="min-w-[650px] space-y-3 font-mono text-xs">
          {steps.map((s, idx) => (
            <div
              key={s.num}
              className="group flex items-center justify-between gap-4 rounded-lg border border-border bg-background/60 p-3 transition-colors hover:border-amber-fg/40 hover:bg-card"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-md bg-muted font-bold text-amber-fg border border-border">
                  {s.num}
                </span>
                <div>
                  <div className="font-semibold text-foreground">{s.title}</div>
                  <div className="text-[0.7rem] text-muted-foreground">{s.type}</div>
                </div>
              </div>

              <div className="rounded bg-muted/70 px-3 py-1 text-[0.75rem] text-muted-foreground font-mono">
                <code>{s.code}</code>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[0.65rem] font-medium text-amber-fg border border-amber-fg/20">
                  {s.badge}
                </span>
                {idx < steps.length - 1 && (
                  <span className="text-muted-foreground/40 font-mono">↓</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg bg-muted/30 p-3 text-xs text-muted-foreground border border-border/60">
          <strong className="text-foreground">Takeaway:</strong> Steps 1 through 4 occur entirely in JavaScript memory (cheap). Step 5 is the only phase that touches the browser host C++ DOM tree (expensive).
        </div>
      </div>
    </figure>
  );
}
