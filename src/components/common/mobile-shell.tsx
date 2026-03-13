import { BookCopy, Cloud, Home, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const tabs = [
  { href: "/", label: "클라우드", icon: Cloud, active: true },
  { href: "#", label: "오답노트", icon: BookCopy, active: false },
  { href: "#", label: "홈", icon: Home, active: false },
  { href: "#", label: "내정보", icon: User, active: false }
] as const;

export function MobileShell({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background/95 px-5 pb-4 pt-6 backdrop-blur">
        <div>
          <p className="text-2xl font-black">{title}</p>
          <p className="ds-text-muted mt-1 text-xs">
            WebView-first problem workspace
          </p>
        </div>
      </header>
      <div className="flex-1 px-5 pb-28">{children}</div>
      <nav className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-md -translate-x-1/2 items-center justify-around rounded-t-[2rem] border border-border bg-card px-4 py-3 shadow-card">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            href={tab.href}
            className={cn(
              "ds-nav-label flex flex-col items-center gap-1",
              tab.active ? "text-primary" : "ds-text-muted"
            )}
          >
            <tab.icon className="h-5 w-5" />
            {tab.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
