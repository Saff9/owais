import { person } from "@/content";

// Structured-data (JSON-LD) builders

interface Crumb {
  label: string;
  /** Absolute site path, e.g. "/projects". Omit for the current page. */
  href?: string;
}

/** BreadcrumbList for a page — mirrors the visible `Crumbs` component. */
export function breadcrumbJsonLd(crumbs: readonly Crumb[]) {
  const base = `https://${person.domain}`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${base}${c.href}` } : {}),
    })),
  };
}
