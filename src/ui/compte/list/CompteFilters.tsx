

"use client";

import type { ChangeEvent } from "react";

export interface CompteFiltersProps {
  initial: {
    search: string;
    actif: boolean | null;
  };
  onChange: (next: {
    search: string;
    actif: boolean | null;
  }) => void;
}

export function CompteFilters({ initial, onChange }: CompteFiltersProps) {
  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    onChange({
      ...initial,
      search: e.target.value,
    });
  }

  function onActifChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange({
      ...initial,
      actif: e.target.value === "" ? null : e.target.value === "true",
    });
  }

  return (
    <div className="mb-4 flex items-center gap-3">
      <input
        type="text"
        placeholder="Recherche…"
        className="h-9 w-48 rounded-md border px-3 text-sm"
        value={initial.search}
        onChange={onSearchChange}
      />

      <select
        className="h-9 rounded-md border px-2 text-sm"
        value={initial.actif === null ? "" : initial.actif ? "true" : "false"}
        onChange={onActifChange}
      >
        <option value="">Tous</option>
        <option value="true">Actifs</option>
        <option value="false">Inactifs</option>
      </select>
    </div>
  );
}