import "@/app/globals.css";
import { ThemeProvider } from "@/theme/theme-provider";
import { Toaster } from "sonner";

export const metadata = {
  title: "Axcio App",
  description: "Votre application Axcio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}

