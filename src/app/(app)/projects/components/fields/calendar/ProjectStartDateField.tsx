

"use client";

import { useState } from "react";
import { z } from "zod";

import { toDateInputValue } from "@/helpers/date";

/* ------------------------------------------------------------------
   Zod schema
   ------------------------------------------------------------------ */

/**
 * T0 du projet :
 * - champ optionnel
 * - doit être une date valide si renseignée
 */
const schema = z
  .string()
  .refine(
    (v) => v === "" || !isNaN(new Date(v).getTime()),
    "La date de début du projet est invalide"
  );

/* ------------------------------------------------------------------
   Props
   ------------------------------------------------------------------ */

interface Props {
  /** Date ISO (YYYY-MM-DD ou ISO complet) */
  value: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
}

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export function ProjectStartDateField({
  value,
  onChange,
  disabled,
}: Props) {
  const [error, setError] = useState<string | null>(null);

  function handleChange(v: string) {
    const parsed = schema.safeParse(v);

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
    } else {
      setError(null);
    }

    // Vide => null (cohérent DB)
    onChange(v ? v : null);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        T0 du projet
      </label>

      <div className="md:col-span-5">
        <input
          type="date"
          className="h-9 w-full rounded-md border px-3 text-sm disabled:opacity-50"
          value={toDateInputValue(value)}
          disabled={disabled}
          onChange={(e) => handleChange(e.target.value)}
        />

        {error && (
          <p className="mt-1 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
