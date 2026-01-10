

"use client";

import { useState } from "react";
import { z } from "zod";

/* ------------------------------------------------------------------
   Zod schema
   ------------------------------------------------------------------ */

/**
 * Durée de vie du projet (jours) :
 * - champ optionnel
 * - entier positif si renseigné
 */
const schema = z
  .number()
  .int("La durée doit être un nombre entier")
  .positive("La durée doit être strictement positive");

/* ------------------------------------------------------------------
   Props
   ------------------------------------------------------------------ */

interface Props {
  /** Durée en jours */
  value: number | null;
  onChange: (value: number | null) => void;
  disabled?: boolean;
}

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export function ProjectDureeVieField({
  value,
  onChange,
  disabled,
}: Props) {
  const [error, setError] = useState<string | null>(null);

  function handleChange(raw: string) {
    if (raw === "") {
      setError(null);
      onChange(null);
      return;
    }

    const num = Number(raw);
    const parsed = schema.safeParse(num);

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
    } else {
      setError(null);
    }

    onChange(isNaN(num) ? null : num);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Durée de vie (jours)
      </label>

      <div className="md:col-span-5">
        <input
          type="number"
          min={1}
          step={1}
          className="h-9 w-full rounded-md border px-3 text-sm disabled:opacity-50"
          value={value ?? ""}
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
