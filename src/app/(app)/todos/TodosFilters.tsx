"use client";

import type { ChangeEvent } from "react";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

export interface TodoTypeOption {
  id: number;
  label: string;
}

export interface TodosFiltersProps {
  initial: {
	search: string;
	configTypeId: number | null;
  };
  types: TodoTypeOption[];
  onChange: (next: {
	search: string;
	configTypeId: number | null;
  }) => void;
}


/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export function TodosFilters({
  initial,
  types,
  onChange,
}: TodosFiltersProps) {

  /* -------------------- Handlers -------------------- */

  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
	onChange({
	  ...initial,
	  search: e.target.value,
	});
  }

  function onTypeChange(e: ChangeEvent<HTMLSelectElement>) {
	onChange({
	  ...initial,
	  configTypeId: e.target.value
		? Number(e.target.value)
		: null,
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

	  <select
		className="h-9 rounded-md border px-2 text-sm"
		value={initial.configTypeId ?? ""}
		onChange={onTypeChange}
	  >
		<option value="">Tous les types</option>
		{types.map((type) => (
		  <option key={type.id} value={type.id}>
			{type.label}
		  </option>
		))}
	  </select>
	</div>
  );
}
