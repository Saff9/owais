import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Terminal } from "@/components/home/terminal";
import { TypedRole } from "@/components/home/typed-role";
import { experience, pages, person, projects, skillGroups, stats } from "@/content";

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="dot-grid relative overflow-hidden border-b border-border"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 section-y">
        <div className="rise">
          <h1 className="text-display max-w-xl font-bold tracking-tight">
            I build
            <br />
            the stuff with
            <br />
            <span className="text-amber-fg">engineered care.</span>
          </h1>

          <div className="mt-6">
            <TypedRole roles={person.roles} />
          </div>

          <p className="mt-6 max-w-lg text-balance text-base leading-relaxed text-muted-foreground">
            {person.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="font-mono text-sm tracking-tight"
            >
              <Link href="/projects">
                view projects <span aria-hidden>→</span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-muted-foreground/30 font-mono text-sm hover:border-ring hover:bg-accent"
            >
              <Link href="/contact">
                <span className="text-amber-fg" aria-hidden>
                  ❯
                </span>{" "}
                contact me
              </Link>
            </Button>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-card px-4 py-3">
                <dt className="label-mono text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="mt-1 font-mono text-lg font-semibold text-foreground">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rise rise-2">
          <Terminal
            person={person}
            skillGroups={skillGroups}
            projects={projects}
            experience={experience}
            pages={pages}
          />
          <p className="label-mono mt-3 text-center text-muted-foreground">
            type <span className="text-amber-fg">help</span>
          </p>
        </div>
      </div>
    </section>
  );
}
