

"use client";

import { Input } from "@/components/ui/input";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

interface ClientStatusOption {
  id: string;
  label: string;
}

interface ClientsFiltersProps {
  initial: {
    search: string;
    status: string | null;
  };
  statuses: ClientStatusOption[];
  onChange: (next: {
    search: string;
    status: string | null;
  }) => void;
}

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export function ClientsFilters({
  initial,
  statuses,
  onChange,
}: ClientsFiltersProps) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      {/* Recherche */}
      <Input
        placeholder="Rechercher un client…"
        value={initial.search}
        onChange={(e) =>
          onChange({
            ...initial,
            search: e.target.value,
          })
        }
        className="w-60"
      />

      {/* Filtre état */}
      <select
        className="h-9 rounded-md border px-3 text-sm"
        value={initial.status ?? ""}
        onChange={(e) =>
          onChange({
            ...initial,
            status: e.target.value || null,
          })
        }
      >
        <option value="">Tous les états</option>
        {statuses.map((status) => (
          <option key={status.id} value={status.id}>
            {status.label}
          </option>
        ))}
      </select>
    </div>
  );
}
