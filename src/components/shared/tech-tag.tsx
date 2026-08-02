export function TechTag({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-text transition-colors hover:border-primary hover:bg-card">
      {name}
    </span>
  );
}
