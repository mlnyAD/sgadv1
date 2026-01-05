

import { ReactNode } from "react";

export default function ProjectLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Plus tard : ProjectHeader (nom, statut, breadcrumb) */}
      {children}
    </div>
  );
}

