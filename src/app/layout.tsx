import "@/app/globals.css";
import { ThemeProvider } from "@/theme/theme-provider";

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
        </ThemeProvider>
      </body>
    </html>
  );
}

