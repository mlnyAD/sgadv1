

"use client";

import type { ChangeEvent } from "react";

type FilterOption = {
  value: string;
  label: string;
};

export interface PurchaseFiltersProps {
  initial: {
    search: string;
    exerId: string;
    socId: string;
    ccId: string;
  };
  options: {
    exercices: FilterOption[];
    societes: FilterOption[];
    centresCout: FilterOption[];
  };
  onChange: (next: {
    search: string;
    exerId: string;
    socId: string;
    ccId: string;
  }) => void;
  onReset: () => void;
}

export function PurchaseFilters({
  initial,
  options,
  onChange,
  onReset,
}: PurchaseFiltersProps) {
  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    onChange({ ...initial, search: e.target.value });
  }

  function onExerciceChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange({ ...initial, exerId: e.target.value });
  }

  function onSocieteChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange({ ...initial, socId: e.target.value });
  }

  function onCentreCoutChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange({ ...initial, ccId: e.target.value });
  }

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <input
        type="text"
        placeholder="Recherche… (réf / désignation)"
        className="h-9 w-72 rounded-md border px-3 text-sm"
        value={initial.search}
        onChange={onSearchChange}
      />

      <select
        className="h-9 min-w-44 rounded-md border px-3 text-sm"
        value={initial.socId}
        onChange={onSocieteChange}
      >
        <option value="">Tous les fournisseurs</option>
        {options.societes.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className="h-9 min-w-40 rounded-md border px-3 text-sm"
        value={initial.ccId}
        onChange={onCentreCoutChange}
      >
        <option value="">Tous les centres de coût</option>
        {options.centresCout.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className="h-9 min-w-36 rounded-md border px-3 text-sm"
        value={initial.exerId}
        onChange={onExerciceChange}
      >
        <option value="">Tous les exercices</option>
        {options.exercices.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={onReset}
        className="h-9 rounded-md border px-3 text-sm hover:bg-muted"
      >
        Réinitialiser
      </button>
    </div>
  );
}