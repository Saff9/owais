import { Crumbs } from "./crumbs";

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
}

// Page header with title and breadcrumb
export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <header className="dot-grid border-b border-border">
      <div className="site-container section-y-sm">
        <div className="mb-6">
          <Crumbs items={[{ label: "~", href: "/" }, { label }]} />
        </div>

        <div className="max-w-4xl">
          <h1 className="text-page font-semibold tracking-tight text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
