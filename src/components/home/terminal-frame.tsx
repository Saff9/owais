import type { Line } from "./terminal-commands";

const LINE_COLOR: Record<Line["kind"], string> = {
  cmd: "text-term-text",
  out: "text-term-dim",
  err: "text-term-red",
  ok: "text-term-green",
};

export function TerminalLine({ line }: { line: Line }) {
  return (
    <p className={LINE_COLOR[line.kind]}>
      {line.kind === "cmd" ? (
        <>
          <span className="text-term-green">❯</span> {line.text}
        </>
      ) : (
        line.text
      )}
    </p>
  );
}

export function TerminalTitleBar({ handle }: { handle: string }) {
  return (
    <div className="flex items-center justify-between border-b border-term-border bg-term-surface px-4 py-2.5">
      <div className="flex items-center gap-1.5" aria-hidden>
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
      </div>
      <p className="font-mono text-xs text-term-dim">
        {handle}@portfolio: ~
      </p>
      <span className="font-mono text-[0.65rem] text-term-dim" aria-hidden>
        zsh
      </span>
    </div>
  );
}

export function TerminalStatusBar() {
  return (
    <div className="flex items-center justify-between border-t border-term-border bg-term-surface px-4 py-1.5 font-mono text-[0.65rem] text-term-dim">
      <span>↑↓ history · ⌃L clear</span>
      <span className="flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-term-green" aria-hidden />
        utf-8 · zsh
      </span>
    </div>
  );
}
