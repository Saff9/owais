import { Linkedin } from "lucide-react";
import { SiX } from "react-icons/si";
import { CopyLink } from "./copy-link";

interface ShareRowProps {
  url: string;
  title: string;
}

const chip =
  "inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-mono text-muted-foreground transition-colors hover:border-ring hover:text-foreground";

export function ShareRow({ url, title }: ShareRowProps) {
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;

  return (
    <section aria-label="Share this post" className="card-panel p-5 sm:p-6">
      <h2 className="label-mono mb-4 flex items-center gap-2 text-muted-foreground">
        <span className="text-amber-fg" aria-hidden>
          $
        </span>
        share this note
      </h2>
      <div className="flex flex-wrap items-center gap-2.5">
        <CopyLink url={url} />
        <a href={xHref} target="_blank" rel="noopener noreferrer" className={chip}>
          <SiX className="size-3.5" aria-hidden />
          x.com
        </a>
        <a
          href={linkedinHref}
          target="_blank"
          rel="noopener noreferrer"
          className={chip}
        >
          <Linkedin className="size-3.5" aria-hidden />
          linkedin
        </a>
      </div>
    </section>
  );
}
