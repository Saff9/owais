import type { ComponentType, CSSProperties } from "react";
import {
  Atom,
  Braces,
  Command,
  Database,
  FlaskConical,
  Globe,
} from "lucide-react";
import {
  SiBun,
  SiDocker,
  SiFastapi,
  SiFramer,
  SiGit,
  SiGithub,
  SiGnubash,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiShadcnui,
  SiSocketdotio,
  SiSqlite,
  SiTailwindcss,
  SiTanstack,
  SiTelegram,
  SiTrpc,
  SiTypescript,
  SiVercel,
  SiVitest,
  SiX,
  SiZod,
} from "react-icons/si";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<{ className?: string; style?: CSSProperties }>;

interface TechEntry {
  icon: IconComponent;
  color?: string;
}

// Simple Icons dropped the LinkedIn mark, so it lives here inline.
function LinkedinIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className} style={style}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

export const TECH_ICONS: Record<string, TechEntry> = {
  // languages
  TypeScript: { icon: SiTypescript, color: "#3178c6" },
  JavaScript: { icon: SiJavascript, color: "#e8c940" },
  Python: { icon: SiPython, color: "#4b8bbe" },
  SQL: { icon: Database, color: "#d98c1d" },
  Bash: { icon: SiGnubash, color: "#4eaa25" },

  // frontend
  React: { icon: SiReact, color: "#61dafb" },
  "Next.js": { icon: SiNextdotjs },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06b6d4" },
  "shadcn/ui": { icon: SiShadcnui },
  "Framer Motion": { icon: SiFramer },
  Zustand: { icon: Atom },
  "TanStack Query": { icon: SiTanstack, color: "#ff4154" },

  // backend
  "Node.js": { icon: SiNodedotjs, color: "#5fa04e" },
  FastAPI: { icon: SiFastapi, color: "#009688" },
  Bun: { icon: SiBun },
  tRPC: { icon: SiTrpc, color: "#2596be" },
  "REST APIs": { icon: Globe },
  Prisma: { icon: SiPrisma, color: "#8a94a8" },
  PostgreSQL: { icon: SiPostgresql, color: "#5b8dc9" },
  SQLite: { icon: SiSqlite, color: "#3f8ab5" },
  Zod: { icon: SiZod },
  "Socket.io": { icon: SiSocketdotio },

  // ops & tools
  Git: { icon: SiGit, color: "#f05032" },
  Docker: { icon: SiDocker, color: "#2496ed" },
  "CI/CD": { icon: Command },
  Vercel: { icon: SiVercel },
  Playwright: { icon: FlaskConical, color: "#2ead33" },
  Vitest: { icon: SiVitest, color: "#fcc72b" },

  // social
  GitHub: { icon: SiGithub },
  LinkedIn: { icon: LinkedinIcon },
  "X / Twitter": { icon: SiX },
  Telegram: { icon: SiTelegram, color: "#229ED9" },
};

const FALLBACK: TechEntry = { icon: Braces };

interface TechIconProps {
  name: string;
  /** Show the logo in its brand colour; defaults to current text colour. */
  colored?: boolean;
  className?: string;
}

export function TechIcon({ name, colored = false, className }: TechIconProps) {
  const entry = TECH_ICONS[name] ?? FALLBACK;
  const style: CSSProperties | undefined =
    colored && entry.color ? { color: entry.color } : undefined;
  const Icon = entry.icon;
  return <Icon aria-hidden className={className} style={style} />;
}

interface StackListProps {
  stack: readonly string[];
  className?: string;
  /** Colour the logos (used on dark cards where brand marks scan well). */
  colored?: boolean;
}

export function StackList({ stack, className, colored = true }: StackListProps) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Technologies used">
      {stack.map((name) => (
        <li
          key={name}
          className="flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
        >
          <TechIcon name={name} colored={colored} className="size-3" />
          {name}
        </li>
      ))}
    </ul>
  );
}
