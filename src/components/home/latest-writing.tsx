import { PostCard } from "@/components/blog/post-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { getAllPosts } from "@/lib/blog";

const POSTS_SHOWN = 3;

export function LatestWriting() {
  const posts = getAllPosts().slice(0, POSTS_SHOWN);

  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="writing-heading" className="scroll-mt-24 border-b border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 section-y">
        <SectionHeading
          label="writing"
          title="Notes from the workshop"
          id="writing-heading"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
