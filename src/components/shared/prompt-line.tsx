export function PromptLine({
  command,
  className = "",
}: {
  command: string;
  className?: string;
}) {
  return (
    <p className={`font-mono text-sm ${className}`}>
      <span className="text-amber-fg">$</span>{" "}
      <span className="text-muted-foreground">{command}</span>
    </p>
  );
}
