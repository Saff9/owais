export function BackendRoadmapDiagram() {
  const pillars = [
    {
      num: "01",
      title: "Networking & Protocols",
      badge: "Foundations",
      topics: ["Request Lifecycle & Hops", "HTTP 1.1 / 2.0 / 3.0", "Routing & Versioning", "Serialization (JSON vs Protobuf)"],
      color: "border-amber-fg/30 text-amber-fg bg-amber-500/10",
    },
    {
      num: "02",
      title: "Security & Request Pipeline",
      badge: "Application Layer",
      topics: ["Auth (JWT, Sessions, OAuth)", "Validation & Sanitization", "Middleware Chaining", "Request Context & Scope"],
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    },
    {
      num: "03",
      title: "Business Logic & Storage",
      badge: "Core Systems",
      topics: ["MVC & Handlers/Services", "Relational & NoSQL (ACID)", "Business Logic Layer (BLL)", "Multi-Tier Caching & Redis"],
      color: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
    },
    {
      num: "04",
      title: "Async & Distributed Systems",
      badge: "Scale & Resilience",
      topics: ["Background Task Queues", "Elasticsearch & Full-Text", "Real-Time (WebSockets, SSE)", "Large File & S3 Streaming"],
      color: "border-violet-500/30 text-violet-400 bg-violet-500/10",
    },
    {
      num: "05",
      title: "Production & DevOps",
      badge: "Operations",
      topics: ["Logging, Tracing & Metrics", "Graceful Shutdown (Signals)", "Testing & 12-Factor App", "Docker, K8s & Deployments"],
      color: "border-rose-500/30 text-rose-400 bg-rose-500/10",
    },
  ];

  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
      <figcaption className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-3 font-mono text-xs">
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-amber-fg animate-pulse" />
          <span className="font-semibold text-foreground">Interactive Roadmap:</span> 31-Part Backend Engineering Architecture
        </span>
        <span className="rounded bg-background px-2 py-0.5 text-[0.7rem] text-muted-foreground border border-border font-mono">
          First Principles Map
        </span>
      </figcaption>

      <div className="p-6 overflow-x-auto">
        <div className="min-w-[700px] grid grid-cols-5 gap-3 font-mono text-xs">
          {pillars.map((p) => (
            <div
              key={p.num}
              className="flex flex-col justify-between rounded-lg border border-border bg-background/60 p-3.5 transition-all hover:border-amber-fg/40 hover:bg-card"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-muted-foreground">{p.num}</span>
                  <span className={`rounded px-1.5 py-0.5 text-[0.65rem] border ${p.color}`}>
                    {p.badge}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground text-xs leading-tight mb-3">
                  {p.title}
                </h4>

                <ul className="space-y-1.5 text-[0.7rem] text-muted-foreground">
                  {p.topics.map((t) => (
                    <li key={t} className="flex items-start gap-1.5">
                      <span className="text-amber-fg">›</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-lg border border-amber-fg/30 bg-amber-500/10 p-3.5 text-xs font-mono">
          <strong className="text-amber-fg">Engineering Principle:</strong> Backend engineering is not just building CRUD endpoints in a framework. It is understanding how data travels over physical networks, how the operating system handles I/O, and how layered architectures isolate business rules from transport mechanisms.
        </div>
      </div>
    </figure>
  );
}
