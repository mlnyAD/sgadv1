

"use client";

import type { ChangeEvent } from "react";
import type { LotTravStatusId } from "@/domain/lottrav/lottrav-status";

export interface LotTravStatusOption {
  id: LotTravStatusId;
  label: string;
}

export interface LotTravFiltersProps {
  initial: {
    search: string;
    statusId: LotTravStatusId | null;
  };
  statuses: LotTravStatusOption[];
  onChange: (next: {
    search: string;
    statusId: LotTravStatusId | null;
  }) => void;
}

export function LotTravFilters({
  initial,
  statuses,
  onChange,
}: LotTravFiltersProps) {
  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    onChange({
      ...initial,
      search: e.target.value,
    });
  }

  function onStatusChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange({
      ...initial,
      statusId: e.target.value
        ? (Number(e.target.value) as LotTravStatusId)
        : null,
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
        value={initial.statusId ?? ""}
        onChange={onStatusChange}
      >
        <option value="">Tous les statuts</option>
        {statuses.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
