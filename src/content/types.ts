export interface Page {
  href: string;
  label: string;
}

export interface SocialLink {
  label: string;
  handle: string;
  href: string;
}

// Local SEO metadata
export interface Location {
  city: string;
  region: string;
  country: string;
  /** ISO 3166-1 alpha-2, e.g. "IN". */
  countryCode: string;
}

/** A service vertical offered — feeds search-engine structured data and the Services section. */
export interface Service {
  id?: string;
  name: string;
  badge?: string;
  description: string;
  deliverables?: readonly string[];
  stack?: readonly string[];
  icon?: "web" | "backend" | "cms" | "fullstack";
}

/** A number shown under the hero. */
export interface Stat {
  label: string;
  value: string;
}

/** Identity + contact details. One `Person`, one site. */
export interface Person {
  name: string;
  firstName: string;
  handle: string;
  role: string;
  tagline: string;
  timezone: string;
  email: string;
  telegram?: string;
  telegramHandle?: string;
  calBookingUrl?: string;
  domain: string;
  summary: readonly string[];
  /** Roles cycled by the hero's typewriter. */
  roles: readonly string[];
  /** Metadata-only local targeting — see the Location interface above. */
  location?: Location;
}

/** A project card / case-study page. `name` is the URL slug. */
export interface Project {
  name: string;
  year: string;
  tagline: string;
  description: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  highlights: readonly string[];
  stack: readonly string[];
  /** Primary language — picks the logo and the filter on /projects. */
  language: string;
  featured?: boolean;
  repo?: string;
  status?: string;
  role?: string;
  category?: string;
}

/** One job in the career `git log`. */
export interface Experience {
  hash: string;
  ref: string;
  period: string;
  role: string;
  company: string;
  points: readonly string[];
}

/** A skills group rendered as a directory in the tree. */
export interface SkillGroup {
  title: string;
  items: readonly string[];
}

/** A working principle on the About page. `icon` is a lucide key. */
export interface Principle {
  icon: "ship" | "types" | "performance" | "accessibility";
  title: string;
  body: string;
}
