import type { Heading } from "@/lib/blog";

const MIN_HEADINGS = 2;

interface TocProps {
  headings: readonly Heading[];
  file: string;
}

export function Toc({ headings, file }: TocProps) {
  if (headings.length < MIN_HEADINGS) return null;

  const lastRow = headings.length - 1;
  const lastH2 = headings.reduce((acc, h, i) => (h.depth === 2 ? i : acc), -1);

  function marker(i: number): string {
    const h = headings[i];
    const isLastChild =
      h.depth === 2
        ? i === lastH2
        : i === lastRow || headings[i + 1].depth === 2;
    const branch = isLastChild ? "└── " : "├── ";
    if (h.depth === 2) return branch;
    let parent = i - 1;
    while (parent >= 0 && headings[parent].depth !== 2) parent--;
    return `${parent === lastH2 ? "    " : "│   "}${branch}`;
  }

  return (
    <nav aria-label="On this page" className="card-panel mb-10 p-5 sm:p-6">
      <p className="mb-4 font-mono text-sm">
        <span className="text-amber-fg">$</span>{" "}
        <span className="text-muted-foreground">grep &quot;^#&quot; {file}</span>
      </p>
      <ul className="space-y-1.5 font-mono text-sm leading-relaxed">
        {headings.map((h, i) => (
          <li key={`${h.id}-${i}`}>
            <span className="text-muted-foreground/60" aria-hidden>
              {marker(i)}
            </span>
            <a
              href={`#${h.id}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
