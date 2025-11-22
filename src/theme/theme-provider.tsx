
// src/theme/theme-provider.tsx

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={true}
    >
      {children}
    </NextThemesProvider>
  );
}
