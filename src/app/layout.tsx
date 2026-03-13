import type { Metadata } from "next";
import { Providers } from "@/components/common/providers";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "HICONSY",
  description: "Problem listing and registration service"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
