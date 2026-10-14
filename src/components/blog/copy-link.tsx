"use client";


import { useState } from "react";
import { Check, Link2 } from "lucide-react";

const FEEDBACK_MS = 1600;

interface CopyLinkProps {
  /** Passed in from the server page — keeps content out of the client bundle. */
  url: string;
  /** Button caption next to the icon; defaults to "copy link". */
  label?: string;
}

export function CopyLink({ url, label = "copy link" }: CopyLinkProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), FEEDBACK_MS);
    } catch {
      /* clipboard blocked — the X/LinkedIn links next to it still work */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Link copied" : "Copy link to this post"}
      className="label-mono flex items-center gap-2 rounded-md border border-border px-3 py-2 text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
    >
      {copied ? (
        <Check className="size-3.5 text-chart-2" aria-hidden />
      ) : (
        <Link2 className="size-3.5" aria-hidden />
      )}
      {copied ? "copied" : label}
    </button>
  );
}
