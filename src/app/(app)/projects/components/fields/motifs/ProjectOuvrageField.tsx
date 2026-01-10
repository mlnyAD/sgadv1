

"use client";

import { useMemo } from "react";
import type { SelectOption } from "@/app/(app)/components/fields/types";

interface Props {
  value: string | null;
  options: SelectOption[];
  onChange: (value: string | null) => void;
}

export function ProjectOuvrageField({
  value,
  options,
  onChange,
}: Props) {
  const effectiveOptions = useMemo(() => {
    if (value && !options.some(o => o.value === value)) {
      return [{ value, label: "(ouvrage supprimé)" }, ...options];
    }
    return options;
  }, [value, options]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Type d&apos;ouvrage
      </label>

      <div className="md:col-span-5">
        <select
          className="h-9 w-full rounded-md border px-3 text-sm"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value || null)}
        >
          <option value="">— Sélectionner un ouvrage —</option>

          {effectiveOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
