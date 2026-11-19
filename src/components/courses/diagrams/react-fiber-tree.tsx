export function ReactFiberTreeDiagram() {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
      <figcaption className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2.5 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-amber-fg" />
          <span className="font-semibold text-foreground">Interactive Diagram:</span> React Fiber Double Buffering
        </span>
        <span className="rounded bg-background px-2 py-0.5 text-[0.7rem] text-muted-foreground border border-border">
          Linked List Pointer Model
        </span>
      </figcaption>

      <div className="p-6 overflow-x-auto">
        <div className="min-w-[620px] grid grid-cols-2 gap-8 text-xs font-mono">
          {/* Current Tree */}
          <div className="rounded-lg border border-border bg-background/50 p-4 relative">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-500" />
                Current Tree (Screen)
              </span>
              <span className="text-[0.65rem] text-muted-foreground">Committed DOM</span>
            </div>

            <div className="space-y-4">
              <div className="rounded border border-border bg-card p-2.5 text-center shadow-sm">
                <div className="font-semibold text-amber-fg">Fiber: &lt;App /&gt;</div>
                <div className="text-[0.7rem] text-muted-foreground mt-1">
                  child ──► &lt;Header /&gt; | alternate ◄──► WIP
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pl-4 border-l-2 border-dashed border-border">
                <div className="rounded border border-border bg-card p-2 text-center">
                  <div className="font-medium text-foreground">&lt;Header /&gt;</div>
                  <div className="text-[0.65rem] text-muted-foreground mt-1">
                    sibling ──► &lt;Main /&gt;
                  </div>
                </div>

                <div className="rounded border border-border bg-card p-2 text-center">
                  <div className="font-medium text-foreground">&lt;Main /&gt;</div>
                  <div className="text-[0.65rem] text-muted-foreground mt-1">
                    return ──► &lt;App /&gt;
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* WorkInProgress Tree */}
          <div className="rounded-lg border border-amber-fg/40 bg-background/50 p-4 relative">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
              <span className="font-semibold text-amber-fg flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-amber-fg animate-pulse" />
                WorkInProgress Tree (Memory)
              </span>
              <span className="text-[0.65rem] text-amber-fg/80">Interruptible Diff</span>
            </div>

            <div className="space-y-4">
              <div className="rounded border border-amber-fg/40 bg-card p-2.5 text-center shadow-sm">
                <div className="font-semibold text-amber-fg">Fiber: &lt;App /&gt; (WIP)</div>
                <div className="text-[0.7rem] text-muted-foreground mt-1">
                  Cloned from current | Bitmask: Placement
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pl-4 border-l-2 border-dashed border-amber-fg/40">
                <div className="rounded border border-border bg-card p-2 text-center">
                  <div className="font-medium text-foreground">&lt;Header /&gt;</div>
                  <div className="text-[0.65rem] text-emerald-400 mt-1">Memoized (Bypassed)</div>
                </div>

                <div className="rounded border border-amber-fg/50 bg-amber-500/10 p-2 text-center">
                  <div className="font-medium text-amber-fg">&lt;Main /&gt; (Dirty)</div>
                  <div className="text-[0.65rem] text-amber-fg mt-1">flags: Update</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-muted/30 p-3 text-xs text-muted-foreground border border-border/60">
          <strong className="text-foreground">Fiber Pointer Traversal:</strong> Each Fiber node maintains three key pointers: <code className="text-amber-fg font-mono">child</code> (first child), <code className="text-amber-fg font-mono">sibling</code> (next sibling), and <code className="text-amber-fg font-mono">return</code> (parent). This removes recursion from the call stack and lets React yield to the browser between any two units of work.
        </div>
      </div>
    </figure>
  );
}
