

import "@/app/globals.css";
import { ThemeProvider } from "@/theme/theme-provider";
import { Toaster } from "sonner";
import Providers from "@/app/providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class">
          <Providers>
            {children}
          </Providers>
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}