"use client";

import type { ChangeEvent } from "react";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

export interface SocieteTypeOption {
  id: number;
  label: string;
}

export interface SocietesFiltersProps {
  initial: {
    search: string;
  };
  types: SocieteTypeOption[];
  onChange: (next: {
    search: string;
  }) => void;
}


/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export function SocietesFilters({
  initial,
  onChange,
}: SocietesFiltersProps) {

  /* -------------------- Handlers -------------------- */

  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    onChange({
      ...initial,
      search: e.target.value,
    });
  }

  /* -------------------- Render -------------------- */

  return (
    <div className="flex items-center gap-3">
      {/* Recherche */}
      <input
        type="text"
        placeholder="Recherche…"
        className="h-9 w-48 rounded-md border px-3 text-sm"
        value={initial.search}
        onChange={onSearchChange}
      />

    </div>
  );
}

