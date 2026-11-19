"use client";

import { useState } from "react";
import { Youtube, ExternalLink, Play, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VideoEmbed({
  youtubeId,
  videoUrl,
  title,
}: {
  youtubeId?: string;
  videoUrl: string;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border bg-card shadow-lg transition-all">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/60 px-3 py-2 sm:px-4 sm:py-2.5">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="hidden sm:flex items-center gap-1.5 shrink-0" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground min-w-0">
            <Youtube className="size-3.5 shrink-0 text-red-500" />
            <span className="font-semibold text-foreground truncate">
              Watch on YouTube
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="h-7 px-2 font-mono text-[0.7rem] text-muted-foreground hover:text-foreground"
            aria-label={isOpen ? "Hide video companion" : "Show video companion"}
          >
            {isOpen ? (
              <>
                <EyeOff className="size-3 sm:mr-1" />
                <span className="hidden sm:inline">Hide</span>
              </>
            ) : (
              <>
                <Play className="size-3 sm:mr-1" />
                <span className="hidden sm:inline">Watch</span>
              </>
            )}
          </Button>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-7 px-2 font-mono text-[0.7rem] text-amber-fg hover:text-amber-fg/80"
          >
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <span>Open</span>
              <ExternalLink className="size-3" />
            </a>
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="relative aspect-video w-full bg-black">
          {youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="size-full border-0"
            />
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-3 p-6 text-center text-muted-foreground">
              <Youtube className="size-10 text-red-500" />
              <div className="font-mono text-xs">Video available on YouTube</div>
              <Button asChild size="sm" variant="outline">
                <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                  Open on YouTube <ExternalLink className="ml-1.5 size-3" />
                </a>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
