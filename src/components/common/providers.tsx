"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { useState } from "react";
import { ToastProvider } from "@/components/common/toast";
import { getQueryClient } from "@/lib/query/get-query-client";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () => getQueryClient()
  );

  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>{children}</ToastProvider>
      </QueryClientProvider>
    </JotaiProvider>
  );
}
