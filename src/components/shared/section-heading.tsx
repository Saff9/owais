interface SectionHeadingProps {
  label: string;
  title: string;
  id?: string;
}

export function SectionHeading({ label, title, id }: SectionHeadingProps) {
  return (
    <div className="mb-10 sm:mb-14">
      <p className="label-mono mb-3 flex items-center gap-2 text-muted-foreground">
        <span className="text-amber-fg" aria-hidden>
          $
        </span>
        {label}
      </p>
      <h2 id={id} className="text-section font-semibold tracking-tight">
        {title}
      </h2>
    </div>
  );
}
