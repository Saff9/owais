"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

const FEEDBACK_MS = 2000;

export function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), FEEDBACK_MS);
    } catch {
      /* clipboard blocked — selecting the text still works */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      aria-label={copied ? "Code copied" : "Copy code to clipboard"}
      className="flex items-center gap-1.5 rounded px-2 py-1 font-mono text-[0.65rem] text-term-dim transition-colors hover:text-term-text"
    >
      {copied ? (
        <Check className="size-3" aria-hidden />
      ) : (
        <Copy className="size-3" aria-hidden />
      )}
      {copied ? "copied" : "copy"}
    </button>
  );
}
