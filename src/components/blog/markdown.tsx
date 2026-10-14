import type { ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import { CodeBlock } from "./code-block";
import { extractHeadings, type Heading } from "@/lib/blog";

const HEADING_STYLES = {
  h2: "group mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground",
  h3: "group mt-8 scroll-mt-24 text-xl font-semibold tracking-tight text-foreground",
} as const;

function AnchorHeading({
  tag: Tag,
  heading,
  children,
}: {
  tag: "h2" | "h3";
  heading: Heading | undefined;
  children: ReactNode;
}) {
  const id = heading?.id;
  return (
    <Tag id={id} className={HEADING_STYLES[Tag]}>
      {children}
      {id && (
        <a
          href={`#${id}`}
          aria-label={`Link to section: ${heading?.text ?? ""}`}
          className="ml-2 rounded font-mono text-xs text-muted-foreground opacity-0 transition-opacity hover:text-amber-fg focus-visible:opacity-100 focus-visible:ring-1 focus-visible:ring-ring group-hover:opacity-100"
        >
          #
        </a>
      )}
    </Tag>
  );
}

function headingComponents(headings: Heading[]): Components {
  let cursor = 0;
  const takeHeading = () =>
    cursor < headings.length ? headings[cursor++] : undefined;

  return {
    h2: ({ children }) => (
      <AnchorHeading tag="h2" heading={takeHeading()}>
        {children}
      </AnchorHeading>
    ),
    h3: ({ children }) => (
      <AnchorHeading tag="h3" heading={takeHeading()}>
        {children}
      </AnchorHeading>
    ),
  };
}

const components: Components = {
  p: ({ children }) => (
    <p className="mt-4 leading-relaxed text-muted-foreground">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  a: ({ href, children }) => {
    const external = href?.startsWith("http") ?? false;
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="text-amber-fg underline underline-offset-4 transition-opacity hover:opacity-80"
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted-foreground">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-2 border-amber-fg/60 pl-4 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const match = /language-(\w+)/.exec(className ?? "");
    const isInline = !match;
    if (isInline) {
      return (
        <code className="rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
          {children}
        </code>
      );
    }
    return (
      <CodeBlock
        lang={match[1]}
        code={String(children).replace(/\n$/, "")}
      />
    );
  },
  hr: () => <hr className="my-10 border-border" />,
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ""}
      loading="lazy"
      decoding="async"
      className="my-6 w-full rounded-lg border border-border"
    />
  ),
};

export function Markdown({ body }: { body: string }) {
  const headings = extractHeadings(body);
  const activeComponents: Components = {
    ...components,
    ...headingComponents(headings),
  };

  return <ReactMarkdown components={activeComponents}>{body}</ReactMarkdown>;
}
