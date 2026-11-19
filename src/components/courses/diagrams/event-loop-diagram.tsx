export function EventLoopDiagram() {
  const phases = [
    { name: "Timers", desc: "setTimeout() & setInterval() callbacks", color: "text-amber-fg" },
    { name: "Pending Callbacks", desc: "Deferred system operations (TCP errors)", color: "text-foreground" },
    { name: "Idle, Prepare", desc: "Internal Node.js housekeeping", color: "text-muted-foreground" },
    { name: "Poll Phase", desc: "Retrieve new I/O events; execute scripts", color: "text-emerald-400" },
    { name: "Check Phase", desc: "setImmediate() callbacks run here", color: "text-amber-fg" },
    { name: "Close Callbacks", desc: "socket.on('close'), handle disposal", color: "text-rose-400" },
  ];

  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
      <figcaption className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2.5 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-amber-fg" />
          <span className="font-semibold text-foreground">libuv Architecture:</span> Node.js Event Loop Execution Phases
        </span>
        <span className="rounded bg-background px-2 py-0.5 text-[0.7rem] text-muted-foreground border border-border">
          Cyclic Runtime Model
        </span>
      </figcaption>

      <div className="p-6 overflow-x-auto">
        <div className="min-w-[650px] grid grid-cols-3 gap-3 font-mono text-xs">
          {phases.map((p, i) => (
            <div
              key={p.name}
              className="rounded-lg border border-border bg-background/60 p-3 relative hover:border-amber-fg/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[0.65rem] text-muted-foreground">Phase {i + 1}</span>
                <span className="size-1.5 rounded-full bg-amber-fg" />
              </div>
              <div className={`font-semibold ${p.color}`}>{p.name}</div>
              <div className="text-[0.7rem] text-muted-foreground mt-1 leading-snug">{p.desc}</div>
            </div>
          ))}
        </div>

        {/* Microtask Interstitial Warning */}
        <div className="mt-4 rounded-lg border border-amber-fg/40 bg-amber-500/10 p-3.5 text-xs font-mono">
          <div className="flex items-center gap-2 font-semibold text-amber-fg">
            <span>⚡ Interstitial Check:</span> Microtask Queue Execution
          </div>
          <p className="mt-1 text-[0.75rem] text-foreground leading-relaxed">
            Between <strong>every single phase transition</strong> above, the event loop drains the entire microtask queue:
            first <code className="text-amber-fg">process.nextTick()</code>, then resolved <code className="text-amber-fg">Promise.then()</code> callbacks.
          </p>
        </div>
      </div>
    </figure>
  );
}
