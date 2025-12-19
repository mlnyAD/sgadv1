"use client";

import { ReactNode } from "react";

interface DataTableFiltersProps {
  children: ReactNode;
}

export function DataTableFilters({ children }: DataTableFiltersProps) {
  return (
    <div className="flex items-center gap-4 py-2">
      {children}
    </div>
  );
}
