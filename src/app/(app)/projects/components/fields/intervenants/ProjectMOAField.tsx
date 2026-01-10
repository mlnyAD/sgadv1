

"use client";

import type { SelectOption } from "@/app/(app)/components/fields/types";

/* ------------------------------------------------------------------
   Props
   ------------------------------------------------------------------ */

interface Props {
  value: string | null;
  options: SelectOption[];
  onChange: (value: string | null) => void;
}

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export function ProjectMOAField({
  value,
  options,
  onChange,
}: Props) {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Maître d’ouvrage
      </label>

      <div className="md:col-span-5">

      <select
       className="h-9 w-full rounded-md border px-3 text-sm"
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value || null)
        }
      >
        <option value="">—</option>

        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
    </div>
  );
}
