export function TechTag({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-2.5 py-1 text-xs font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-card)]">
      {name}
    </span>
  );
}
