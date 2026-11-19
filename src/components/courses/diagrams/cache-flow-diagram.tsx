export function CacheFlowDiagram() {
  const tiers = [
    {
      name: "Client Browser",
      latency: "< 1ms",
      desc: "Service worker cache, HTTP ETag / Cache-Control",
      hit: "Instant render from disk/RAM",
    },
    {
      name: "Edge CDN",
      latency: "15ms - 40ms",
      desc: "Cloudflare / Vercel Edge Cache around the globe",
      hit: "Cached HTML, static assets & SSR fragments",
    },
    {
      name: "Redis Cache (RAM)",
      latency: "0.2ms - 1ms",
      desc: "In-memory key/value store with TTL & LRU eviction",
      hit: "Precomputed JSON payloads & session data",
    },
    {
      name: "PostgreSQL Database",
      latency: "5ms - 50ms+",
      desc: "Source of truth on NVMe SSD with ACID compliance",
      hit: "Heavy index lookups, joins, transactions",
    },
  ];

  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
      <figcaption className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2.5 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-amber-fg" />
          <span className="font-semibold text-foreground">Multi-Tier Caching:</span> Latency vs Durability Tradeoff
        </span>
        <span className="rounded bg-background px-2 py-0.5 text-[0.7rem] text-muted-foreground border border-border">
          Network Path
        </span>
      </figcaption>

      <div className="p-6 overflow-x-auto">
        <div className="min-w-[650px] space-y-3 font-mono text-xs">
          {tiers.map((t, i) => (
            <div
              key={t.name}
              className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background/60 p-3 hover:border-amber-fg/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-md bg-muted font-bold text-foreground border border-border">
                  L{i + 1}
                </span>
                <div>
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-[0.7rem] text-muted-foreground">{t.desc}</div>
                </div>
              </div>

              <div className="text-right">
                <span className="rounded bg-muted px-2 py-0.5 text-[0.7rem] text-amber-fg font-semibold border border-border">
                  {t.latency}
                </span>
                <div className="text-[0.65rem] text-muted-foreground mt-1">{t.hit}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg bg-muted/30 p-3 text-xs text-muted-foreground border border-border/60">
          <strong className="text-foreground">Cache-Aside Flow:</strong> Application requests check L3 (Redis). On miss, query drops to L4 (PostgreSQL), then writes result to L3 with an expiration TTL before returning to the caller.
        </div>
      </div>
    </figure>
  );
}
