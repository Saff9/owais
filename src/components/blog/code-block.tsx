import { CopyCode } from "./copy-code";

export function CodeBlock({ code, lang }: { code: string; lang: string }) {
  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-term-border bg-term-bg shadow-sm">
      <figcaption className="flex items-center justify-between border-b border-term-border bg-term-surface px-4 py-2 font-mono text-[0.7rem] text-term-dim">
        <span className="flex items-center gap-2">
          <span className="text-term-green" aria-hidden>
            ❯
          </span>
          {lang}
        </span>
        <CopyCode code={code} />
      </figcaption>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[0.8rem] leading-relaxed text-term-text">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
