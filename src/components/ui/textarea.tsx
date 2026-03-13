import * as React from "react";
import { cn } from "@/lib/utils/cn";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "ds-radius-lg ds-placeholder-muted min-h-32 w-full border border-border bg-card px-4 py-4 text-sm text-foreground outline-none focus:border-primary",
      className
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";
