

"use client";

import type { ChangeEvent } from "react";

export type SocieteRoleFilter = "" | "client" | "fournisseur" | "both";

interface SocieteFiltersProps {
  role: SocieteRoleFilter;
  onChange: (next: SocieteRoleFilter) => void;
}

export function SocieteFilters({ role, onChange }: SocieteFiltersProps) {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange(e.target.value as SocieteRoleFilter);
  }

  return (
    <div className="mb-4 flex items-center gap-3">
      <select
        className="h-9 min-w-56 rounded-md border px-3 text-sm"
        value={role}
        onChange={handleChange}
      >
        <option value="">Toutes les sociétés</option>
        <option value="client">Clients</option>
        <option value="fournisseur">Fournisseurs</option>
        <option value="both">Clients et fournisseurs</option>
      </select>
    </div>
  );
}