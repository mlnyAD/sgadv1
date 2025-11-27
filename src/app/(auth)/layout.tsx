import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-100 dark:bg-black">
        {children}
      </body>
    </html>
  );
}
