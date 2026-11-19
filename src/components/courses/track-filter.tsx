"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const TRACKS = [
  { id: "all", label: "All Tracks" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "system-design", label: "System Design" },
] as const;

export function TrackFilter({ activeTrack }: { activeTrack: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const handleSelect = (trackId: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (trackId === "all") {
      params.delete("track");
    } else {
      params.set("track", trackId);
    }
    startTransition(() => {
      const query = params.toString();
      router.push(`/courses${query ? `?${query}` : ""}`);
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Course Tracks">
      {TRACKS.map((t) => {
        const isActive = activeTrack === t.id;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => handleSelect(t.id)}
            className={cn(
              "rounded-lg px-3.5 py-1.5 font-mono text-xs transition-all",
              isActive
                ? "bg-amber-fg text-amber-950 font-semibold shadow-sm"
                : "border border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
