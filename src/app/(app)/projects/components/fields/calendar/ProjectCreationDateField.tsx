

"use client";

import { formatDateFR } from "@/helpers/date";

/* ------------------------------------------------------------------
   Props
   ------------------------------------------------------------------ */

interface Props {
  /** Date ISO (ex: 2024-01-18T10:32:00Z) */
  value: string | null;
}

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export function ProjectCreationDateField({ value }: Props) {
  const displayValue = value
    ? formatDateFR(new Date(value))
    : formatDateFR(new Date());

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Date de création
      </label>

      <div className="md:col-span-5">
        <input
          type="text"
          className="h-9 w-full rounded-md border px-3 text-sm bg-muted cursor-not-allowed"
          value={displayValue}
          disabled
          readOnly
        />
      </div>
    </div>
  );
}
