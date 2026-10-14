"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  buildRoutes,
  runCommand,
  type Line,
  type TerminalData,
  type TerminalHost,
} from "./terminal-commands";
import { TerminalLine, TerminalStatusBar, TerminalTitleBar } from "./terminal-frame";

type TerminalProps = TerminalData;

const BOOT_LINES: Line[] = [
  { kind: "out", text: "last login: now, from a curious visitor" },
  { kind: "out", text: "type `help` to see available commands" },
];

function scrollToEnd(container: HTMLElement | null) {
  if (container) {
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }
}

export function Terminal(props: TerminalProps) {
  const { person, skillGroups, projects, experience, pages } = props;
  const [lines, setLines] = useState<Line[]>(BOOT_LINES);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  const routes = buildRoutes(pages);

  // keep output pinned to bottom
  useEffect(() => {
    scrollToEnd(scrollRef.current);
  }, [lines]);

  const push = (...newLines: Line[]) => setLines((prev) => [...prev, ...newLines]);

  const host: TerminalHost = {
    person,
    skillGroups,
    projects,
    experience,
    pages,
    routes,
    push,
    clear: () => setLines([]),
    remember: (cmd) => {
      setHistory((h) => [cmd, ...h]);
      setHistoryIndex(-1);
    },
    navigate: (href) => router.push(href),
    toggleTheme: () => {
      const next = resolvedTheme === "dark" ? "light" : "dark";
      setTheme(next);
      return next;
    },
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(host, input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = historyIndex - 1;
      if (next < 0) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(history[next] ?? "");
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      role="application"
      aria-label="Interactive terminal — type help for commands"
      id="terminal"
      className="scroll-mt-24 overflow-hidden rounded-xl border border-term-border bg-term-bg shadow-2xl transition-shadow focus-within:ring-2 focus-within:ring-ring/50"
      onClick={() => inputRef.current?.focus()}
    >
      <TerminalTitleBar handle={person.handle} />

      <div
        ref={scrollRef}
        aria-live="polite"
        aria-label="Terminal output"
        className="h-72 overflow-y-auto px-4 py-3 font-mono text-[0.8rem] leading-relaxed sm:h-80"
      >
        {lines.map((l, i) => (
          <TerminalLine key={i} line={l} />
        ))}

        <div className="flex items-center gap-2 text-term-text">
          <span className="text-term-green" aria-hidden>
            ❯
          </span>
          <div className="relative flex-1">
            <label htmlFor="terminal-input" className="sr-only">
              Terminal command input
            </label>
            <input
              id="terminal-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-keyshortcuts="ArrowUp ArrowDown Enter"
              className="w-full bg-transparent text-term-text caret-term-amber outline-none"
            />
          </div>
        </div>
      </div>

      <TerminalStatusBar />
    </div>
  );
}
