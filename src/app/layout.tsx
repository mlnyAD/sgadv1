import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "EasyProject",
  description: "Application Axcio",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
