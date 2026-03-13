import { cn } from "@/lib/utils/cn";

export function ScreenTitle({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("ds-screen-title", className)}>{children}</p>;
}

export function DisplayTitle({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("ds-display-title", className)}>{children}</p>;
}

export function SectionTitle({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("ds-section-title", className)}>{children}</p>;
}

export function SectionDescription({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("ds-section-description", className)}>{children}</p>;
}

export function SectionHeader({
  title,
  description,
  action,
  className
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between", className)}>
      <div>
        <SectionTitle>{title}</SectionTitle>
        {description ? <SectionDescription>{description}</SectionDescription> : null}
      </div>
      {action}
    </div>
  );
}
