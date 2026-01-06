

"use client";

import type { ChangeEvent } from "react";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

export interface LicenceStatusOption {
  id: string;
  label: string;
}

export interface LicencesFiltersProps {
  initial: {
    search: string;
    status: string | null;
  };
  statuses: LicenceStatusOption[];
  onChange: (next: {
    search: string;
    status: string | null;
  }) => void;
}

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export function LicencesFilters({
  initial,
  statuses,
  onChange,
}: LicencesFiltersProps) {

  /* -------------------- Handlers -------------------- */

  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    onChange({
      ...initial,
      search: e.target.value,
    });
  }

  function onStatusChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange({
      ...initial,
      status: e.target.value || null,
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

      {/* Statut */}
      <select
        className="h-9 rounded-md border px-2 text-sm"
        value={initial.status ?? ""}
        onChange={onStatusChange}
      >
        <option value="">Tous les statuts</option>
        {statuses.map((status) => (
          <option key={status.id} value={status.id}>
            {status.label}
          </option>
        ))}
      </select>
    </div>
  );
}
