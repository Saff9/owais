import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { TechIcon } from "@/components/tech-icon";
import { PromptLine } from "@/components/shared/prompt-line";
import { homeSkillGroups, homeSkillsNote } from "@/content";
import { cn } from "@/lib/utils";

function SkillBranch({
  title,
  items,
  isLast,
}: {
  title: string;
  items: readonly string[];
  isLast: boolean;
}) {
  return (
    <div>
      <p className="font-mono text-sm">
        <span className="text-muted-foreground" aria-hidden>
          {isLast ? "└── " : "├── "}
        </span>
        <span className="text-amber-fg font-semibold">{title}/</span>
      </p>
      <ul
        className={cn(
          "ml-1 flex flex-wrap gap-2.5 py-2 pl-5 sm:pl-6",
          !isLast && "border-l border-border"
        )}
      >
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-1.5 rounded-md border border-border/80 bg-background/80 px-2.5 py-1 font-mono text-xs text-foreground transition-colors hover:border-amber-fg/50"
          >
            <TechIcon name={item} colored className="size-3.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SkillsPreview() {
  return (
    <section
      aria-labelledby="skills-heading"
      className="scroll-mt-24 border-b border-border bg-muted/40"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 section-y">
        <SectionHeading
          label="skills"
          title="The core stack I build with"
          id="skills-heading"
        />

        <div className="card-panel mx-auto max-w-3xl p-6 sm:p-8">
          <PromptLine command="tree ~/skills" className="mb-4" />

          <p className="mb-1 font-mono text-sm">
            <span className="text-amber-fg font-bold">skills/</span>
          </p>
          {homeSkillGroups.map((g, i) => (
            <SkillBranch
              key={g.title}
              title={g.title}
              items={g.items}
              isLast={i === homeSkillGroups.length - 1}
            />
          ))}

          <p className="label-mono mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
            {homeSkillsNote}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/about#skills"
            className="label-mono group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            full breakdown ({`all tools & libraries`})
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
