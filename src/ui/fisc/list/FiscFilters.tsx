

"use client";

import type { ChangeEvent } from "react";
import { FISC_TYPES } from "@/domain/fisc/fisc-types.catalog";

export interface FiscFiltersProps {
  initial: {
    search: string;
    typeId: number | null;
    exerId: string | null;
  };
  onChange: (next: {
    search: string;
    typeId: number | null;
    exerId: string | null;
  }) => void;
  exercices?: { id: string; code: string }[];
}

export function FiscFilters({ initial, onChange, exercices = [] }: FiscFiltersProps) {
  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    onChange({ ...initial, search: e.target.value });
  }

  function onTypeChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange({ ...initial, typeId: e.target.value === "" ? null : Number(e.target.value) });
  }

  function onExerChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange({ ...initial, exerId: e.target.value === "" ? null : e.target.value });
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
        value={initial.typeId === null ? "" : String(initial.typeId)}
        onChange={onTypeChange}
      >
        <option value="">Tous types</option>
        {FISC_TYPES.map((t) => (
          <option key={t.id} value={t.id}>
            {t.libelle}
          </option>
        ))}
      </select>

      <select
        className="h-9 rounded-md border px-2 text-sm"
        value={initial.exerId === null ? "" : initial.exerId}
        onChange={onExerChange}
      >
        <option value="">Tous exercices</option>
        {exercices.map((e) => (
          <option key={e.id} value={e.id}>
            {e.code}
          </option>
        ))}
      </select>
    </div>
  );
}