import type { Experience, Page, Person, Project, SkillGroup } from "@/content";

export type Line = { kind: "cmd" | "out" | "err" | "ok"; text: string };

export interface TerminalData {
  person: Person;
  skillGroups: readonly SkillGroup[];
  projects: readonly Project[];
  experience: readonly Experience[];
  pages: readonly Page[];
}

export interface TerminalHost extends TerminalData {
  routes: Record<string, string>;
  /** Append lines of output. */
  push: (...lines: Line[]) => void;
  /** Wipe the screen (`clear`, ⌃L). */
  clear: () => void;
  /** Record a submitted command in the ↑↓ history. */
  remember: (cmd: string) => void;
  /** Navigate to a page href (`goto`). */
  navigate: (href: string) => void;
  /** Switch light/dark; returns the newly active mode. */
  toggleTheme: () => "light" | "dark";
}

export function buildRoutes(pages: readonly Page[]): Record<string, string> {
  const routes: Record<string, string> = { home: "/", "~": "/" };
  for (const p of pages) routes[p.label.toLowerCase()] = p.href;
  return routes;
}

function copyEmail(host: TerminalHost) {
  navigator.clipboard
    .writeText(host.person.email)
    .then(() =>
      host.push({ kind: "ok", text: `✓ copied ${host.person.email} to clipboard` })
    )
    .catch(() =>
      host.push({ kind: "err", text: `clipboard blocked — email: ${host.person.email}` })
    );
}

export function runCommand(host: TerminalHost, raw: string) {
  const cmd = raw.trim();
  if (!cmd) return;

  host.push({ kind: "cmd", text: cmd });
  host.remember(cmd);

  const [name, ...args] = cmd.split(/\s+/);
  const { person, skillGroups, projects, experience, pages, routes, push } = host;

  switch (name.toLowerCase()) {
    case "help": {
      const gotoNames = ["home", ...pages.map((p) => p.label.toLowerCase())].join("|");
      push(
        { kind: "out", text: "available commands:" },
        { kind: "out", text: "  whoami        who is this guy" },
        { kind: "out", text: "  about         short bio" },
        { kind: "out", text: "  services      what I build & deliver" },
        { kind: "out", text: "  skills        tech stack, grouped" },
        { kind: "out", text: "  projects      list shipped work" },
        { kind: "out", text: "  log           experience as a git log" },
        { kind: "out", text: "  contact       how to reach me" },
        { kind: "out", text: "  telegram      direct messenger handle" },
        { kind: "out", text: "  cal           schedule a 15-min discovery call" },
        { kind: "out", text: "  email         copy my email address" },
        { kind: "out", text: `  goto <page>   open a page (${gotoNames})` },
        { kind: "out", text: "  theme         toggle light/dark" },
        { kind: "out", text: "  ls            list pages" },
        { kind: "out", text: "  clear         clear the screen" }
      );
      break;
    }

    case "whoami":
      push(
        { kind: "out", text: `${person.name} — ${person.role}` },
        { kind: "out", text: `tz: ${person.timezone} · https://${person.domain}` }
      );
      break;

    case "about":
      push(
        { kind: "out", text: person.summary[0] },
        { kind: "out", text: "→ run `goto about` for the long version" }
      );
      break;

    case "services":
      push(
        { kind: "out", text: "what I can build for you:" },
        { kind: "out", text: "  1. Web Applications (Next.js, React, SPAs, responsive UX)" },
        { kind: "out", text: "  2. Backend & Database (APIs, PostgreSQL, Prisma, Auth)" },
        { kind: "out", text: "  3. CMS & Admin Panels (Dashboards, custom CRUD, RBAC)" },
        { kind: "out", text: "  4. Full-Stack Products (MVP to production deployment)" },
        { kind: "out", text: "  * Pricing: Flexible & negotiable based on project scope." },
        { kind: "out", text: "→ type `telegram` or `goto contact` to start a project" }
      );
      break;

    case "skills":
      for (const g of skillGroups) {
        push({ kind: "out", text: `skills/${g.title}/ — ${g.items.join(", ")}` });
      }
      break;

    case "projects":
      for (const p of projects) {
        push({
          kind: "out",
          text: `  ${p.name.padEnd(14)} ${p.year}  ${p.tagline}`,
        });
      }
      push({ kind: "out", text: "run `goto projects` for the full grid" });
      break;

    case "log":
      push({ kind: "out", text: "commit history (newest first):" });
      for (const e of experience) {
        const ref = e.ref ? ` (${e.ref})` : "";
        push({
          kind: "out",
          text: `* ${e.hash}${ref} ${e.period} — ${e.role}, ${e.company}`,
        });
      }
      break;

    case "contact":
      push(
        { kind: "out", text: `email: ${person.email}` },
        { kind: "out", text: `telegram: ${person.telegram || "https://t.me/Kanferneo"} (${person.telegramHandle || "@Kanferneo"})` },
        { kind: "out", text: "form: run `goto contact`" },
        { kind: "out", text: "fastest: run `email` to copy email or `telegram` to chat" }
      );
      break;

    case "telegram":
      push(
        { kind: "ok", text: `Telegram handle: ${person.telegramHandle || "@Kanferneo"}` },
        { kind: "out", text: `Link: ${person.telegram || "https://t.me/Kanferneo"}` },
        { kind: "out", text: "Send a message with prefilled project inquiry & scope details" }
      );
      break;

    case "cal":
    case "book":
    case "call":
      push(
        { kind: "ok", text: `Book a 15-min discovery call:` },
        { kind: "out", text: `Link: ${person.calBookingUrl || "https://cal.com/saffan"}` },
        { kind: "out", text: "Pick an available time slot for a quick Google Meet intro" }
      );
      break;

    case "email":
      copyEmail(host);
      break;

    case "goto": {
      const target = (args[0] || "").toLowerCase();
      const href = routes[target];
      if (!href) {
        const names = Object.keys(routes).filter((v) => v !== "~" && v !== "home");
        push({
          kind: "err",
          text: `goto: unknown page '${target || "''"}' — try: ${names.join(", ")}`,
        });
      } else {
        host.navigate(href);
        push({ kind: "ok", text: `→ opening ${target === "~" ? "home" : target}` });
      }
      break;
    }

    case "theme": {
      const next = host.toggleTheme();
      push({ kind: "ok", text: `✓ switched to ${next} mode` });
      break;
    }

    case "ls": {
      const dirs = pages.map((p) => `${p.label.toLowerCase()}/`).join("   ");
      push({ kind: "out", text: dirs });
      break;
    }

    case "clear":
    case "cls":
      host.clear();
      break;

    default:
      push({
        kind: "err",
        text: `command not found: ${name} — type \`help\` for the list`,
      });
  }
}
