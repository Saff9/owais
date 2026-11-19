import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Showreel } from "@/components/home/showreel";
import { TypedRole } from "@/components/home/typed-role";
import { person, stats } from "@/content";

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="dot-grid relative overflow-hidden border-b border-border"
    >
      <div className="site-container grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-12 section-y">
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
              <Link href="/services">
                <span className="text-amber-fg" aria-hidden>
                  ❯
                </span>{" "}
                services & rates
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="font-mono text-sm text-muted-foreground hover:text-foreground"
            >
              <Link href="/contact">
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
          <Showreel />
        </div>
      </div>
    </section>
  );
}
