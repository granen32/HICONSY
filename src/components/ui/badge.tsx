import { cn } from "@/lib/utils/cn";

export function Badge({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "ds-chip text-xs font-medium",
        className
      )}
    >
      {children}
    </span>
  );
}
