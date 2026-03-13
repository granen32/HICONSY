import { LoadingCards } from "@/components/common/states";

export function PageLoading({
  title = "불러오는 중..."
}: {
  title?: string;
}) {
  return (
    <main className="ds-app-surface mx-auto min-h-screen max-w-md px-4 pb-24 pt-6">
      <div className="animate-pulse">
        <div className="h-8 w-32 rounded-full bg-[color:var(--color-surface-muted)]" />
        <div className="mt-3 h-4 w-56 rounded-full bg-[color:var(--color-surface-muted)]" />
      </div>
      <p className="ds-text-muted mt-8 text-sm">{title}</p>
      <section className="mt-4">
        <LoadingCards />
      </section>
    </main>
  );
}
