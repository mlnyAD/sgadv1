// src/app/layout.tsx

import type { ReactNode } from "react";
import { ThemeProvider } from "@/theme/theme-provider";
import "./globals.css";

export const metadata = {
  title: process.env.PROJECTNAME ?? "Application",
  description: process.env.PROJECTDESCRIPTION ?? "Description",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
