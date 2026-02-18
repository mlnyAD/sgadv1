

"use client";

import type { ChangeEvent } from "react";

export interface InvoiceFiltersProps {
  initial: {
    search: string;
  };
  onChange: (next: {
    search: string;
  }) => void;
}

export function InvoiceFilters({ initial, onChange }: InvoiceFiltersProps) {
  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    onChange({ ...initial, search: e.target.value });
  }

  return (
    <div className="mb-4 flex items-center gap-3">
      <input
        type="text"
        placeholder="Recherche… (réf / désignation)"
        className="h-9 w-72 rounded-md border px-3 text-sm"
        value={initial.search}
        onChange={onSearchChange}
      />
    </div>
  );
}