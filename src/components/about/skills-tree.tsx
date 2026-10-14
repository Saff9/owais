import { TechIcon } from "@/components/tech-icon";
import { skillGroups } from "@/content";

export function SkillsTree() {
  return (
    <div
      id="skills"
      className="scroll-mt-24 overflow-x-auto rounded-xl border border-border bg-card p-6 sm:p-8"
    >
      <p className="mb-5 font-mono text-sm">
        <span className="text-amber-fg">$</span>{" "}
        <span className="text-muted-foreground">tree ~/skills --dirsfirst</span>
      </p>

      <div className="font-mono text-sm leading-loose">
        <p className="text-foreground">
          <span className="text-amber-fg">skills/</span>
        </p>
        {skillGroups.map((g, gi) => {
          const isLast = gi === skillGroups.length - 1;
          return (
            <div key={g.title} className="pl-4">
              <p>
                <span className="text-muted-foreground" aria-hidden>
                  {isLast ? "└── " : "├── "}
                </span>
                <span className="text-amber-fg">{g.title}/</span>
              </p>
              <ul className="pl-[3.4ch]">
                {g.items.map((item, i) => {
                  const lastItem = i === g.items.length - 1;
                  return (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-muted-foreground" aria-hidden>
                        {isLast ? "    " : "│   "}
                        {lastItem ? "└── " : "├── "}
                      </span>
                      <TechIcon name={item} colored className="size-3.5 shrink-0" />
                      {item}
                      {i === 0 && (
                        <span className="ml-1 text-[0.62rem] text-muted-foreground">
                          {"/* daily driver */"}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        <p className="pl-4">
          <span className="text-muted-foreground" aria-hidden>
            └──{" "}
          </span>
          <span className="text-muted-foreground">
            0 dependencies on things I can&apos;t debug
          </span>
        </p>
      </div>
    </div>
  );
}
