import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/blog";

function Tag({ tag }: { tag: string }) {
  return (
    <span className="rounded border border-border bg-muted/60 px-2 py-0.5 font-mono text-[0.68rem] text-muted-foreground">
      #{tag}
    </span>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group h-full">
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`${post.title} — ${post.description}`}
        className="card-panel lift flex h-full flex-col p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:p-6"
      >
        <p className="label-mono mb-3 flex items-center gap-3 text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3" aria-hidden />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span aria-hidden>·</span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3" aria-hidden />
            {post.readingMinutes} min
          </span>
          <ArrowUpRight
            className="ml-auto size-3.5 -translate-x-1 translate-y-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
            aria-hidden
          />
        </p>

        <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {post.description}
        </p>

        <div className="mt-auto pt-5">
          <ul className="flex flex-wrap gap-1.5" aria-label="Post tags">
            {post.tags.map((t) => (
              <li key={t}>
                <Tag tag={t} />
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
}
