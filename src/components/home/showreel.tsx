"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";

export function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Guarantee autoplay works across Chrome, Safari, Firefox & Mobile
  // (React JSX muted attribute alone often gets blocked by browser autoplay policies)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy (e.g. low power mode)
          setIsPlaying(false);
        });
    }
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/40 transition-all hover:border-amber-fg/40">
      {/* Window Title Bar */}
      <div className="flex items-center border-b border-border bg-muted/60 px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
      </div>

      {/* Video Container - Click anywhere to Play/Pause */}
      <div
        onClick={togglePlay}
        className="relative aspect-video w-full cursor-pointer overflow-hidden bg-black"
        role="button"
        tabIndex={0}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            togglePlay();
          }
        }}
      >
        <video
          ref={videoRef}
          src="/my-video.mp4"
          loop
          muted
          autoPlay
          playsInline
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="size-full object-cover"
        >
          <source src="/my-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Center Play Overlay (only visible if video is paused / autoplay was blocked) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity">
            <div className="flex size-14 items-center justify-center rounded-full border border-amber-fg/50 bg-black/80 text-amber-fg shadow-lg backdrop-blur-sm transition-transform hover:scale-110">
              <Play className="ml-1 size-6 fill-amber-fg" />
            </div>
          </div>
        )}

        {/* Floating Unmute / Mute Button */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="absolute bottom-3 right-3 z-20 flex size-9 items-center justify-center rounded-lg border border-white/20 bg-black/75 text-white shadow-md backdrop-blur-md transition-all hover:scale-105 hover:border-amber-fg hover:bg-black/95 hover:text-amber-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-fg"
        >
          {isMuted ? (
            <VolumeX className="size-4" aria-hidden />
          ) : (
            <Volume2 className="size-4" aria-hidden />
          )}
        </button>
      </div>
    </div>
  );
}
