export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="ds-radius-xl border border-dashed border-border bg-card px-5 py-10 text-center shadow-card">
      <p className="text-base font-semibold">{title}</p>
      <p className="ds-text-muted mt-2 text-sm">{description}</p>
    </div>
  );
}

export function ErrorState({ description }: { description: string }) {
  return (
    <div className="ds-radius-xl ds-border-danger-subtle border bg-card px-5 py-6 text-sm text-danger shadow-card">
      {description}
    </div>
  );
}

export function LoadingCards() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="ds-radius-lg ds-surface-muted h-48 animate-pulse" />
      ))}
    </div>
  );
}
