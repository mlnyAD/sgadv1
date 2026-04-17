

"use client";

import type { ChangeEvent } from "react";

type FilterOption = {
  value: string;
  label: string;
};

export interface SalesFiltersProps {
  initial: {
    search: string;
    socId: string;
    exerId: string;
    revenueTypeId: string;
    paidStatus: string;
  };
  options: {
    societes: FilterOption[];
    exercices: FilterOption[];
    revenueTypes: FilterOption[];
  };
  onChange: (next: {
    search: string;
    socId: string;
    exerId: string;
    revenueTypeId: string;
    paidStatus: string;
  }) => void;
  onReset: () => void;
}

export function SalesFilters({
  initial,
  options,
  onChange,
  onReset,
}: SalesFiltersProps) {
  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    onChange({ ...initial, search: e.target.value });
  }

  function onSocieteChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange({ ...initial, socId: e.target.value });
  }

  function onExerciceChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange({ ...initial, exerId: e.target.value });
  }

  function onRevenueTypeChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange({ ...initial, revenueTypeId: e.target.value });
  }

  function onPaidStatusChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange({ ...initial, paidStatus: e.target.value });
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
        <option value="">Tous les clients</option>
        {options.societes.map((option) => (
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

      <select
        className="h-9 min-w-44 rounded-md border px-3 text-sm"
        value={initial.revenueTypeId}
        onChange={onRevenueTypeChange}
      >
        <option value="">Tous les types</option>
        {options.revenueTypes.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className="h-9 min-w-40 rounded-md border px-3 text-sm"
        value={initial.paidStatus}
        onChange={onPaidStatusChange}
      >
        <option value="">Toutes</option>
        <option value="paid">Payées</option>
        <option value="unpaid">Non payées</option>
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