import { Youtube, ExternalLink, Sparkles, MessageSquare } from "lucide-react";
import type { Creator } from "@/lib/courses";
import { Button } from "@/components/ui/button";

export function CreatorShoutout({
  creator,
  compact = false,
}: {
  creator: Creator;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-border bg-card/80 px-4 py-3 text-xs shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-red-600/10 text-red-500 border border-red-500/20">
            <Youtube className="size-4" />
          </div>
          <div className="min-w-0 text-xs">
            <span className="text-muted-foreground">Original Video by </span>
            <a
              href={creator.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground underline decoration-amber-fg/40 underline-offset-4 hover:text-amber-fg truncate inline-block max-w-[220px] sm:max-w-none align-bottom"
            >
              {creator.name} ({creator.handle})
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-border/40 sm:border-transparent">
          {creator.discordUrl && (
            <a
              href={creator.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[0.75rem] text-muted-foreground hover:text-foreground"
            >
              <MessageSquare className="size-3" /> Discord
            </a>
          )}
          <a
            href={creator.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[0.75rem] text-amber-fg hover:underline font-medium"
          >
            Watch on YouTube <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-md">
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-red-500/5 blur-3xl"
        aria-hidden
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-600/20">
            <Youtube className="size-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground text-base sm:text-lg">
                {creator.name}
              </span>
              <span className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground border border-border">
                {creator.handle}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[0.65rem] font-medium text-amber-fg border border-amber-fg/20">
                <Sparkles className="size-2.5" /> Featured Creator
              </span>
            </div>

            <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
              {creator.bio ??
                "Engineering creator deep-diving into frontend architecture, JavaScript internals, and full-stack systems."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {creator.discordUrl && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-border font-mono text-xs hover:border-foreground/30 text-muted-foreground hover:text-foreground"
            >
              <a
                href={creator.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                <MessageSquare className="size-3.5" />
                Discord
              </a>
            </Button>
          )}

          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-red-500/30 font-mono text-xs hover:border-red-500 hover:bg-red-500/10 text-foreground"
          >
            <a
              href={creator.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <Youtube className="size-3.5 text-red-500" />
              Visit Channel <ExternalLink className="size-3 text-muted-foreground" />
            </a>
          </Button>
        </div>
      </div>

      <div className="mt-4 border-t border-border/60 pt-3 text-[0.75rem] text-muted-foreground flex items-center justify-between">
        <span>
          💡 <strong>Attribution Notice:</strong> Visual diagrams, code annotations, and written notes are authored by Owais as an educational companion to {creator.name}&apos;s video catalog.
        </span>
      </div>
    </div>
  );
}
