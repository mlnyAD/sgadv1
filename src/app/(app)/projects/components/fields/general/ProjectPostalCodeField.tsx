

"use client";

import { useState } from "react";
import { z } from "zod";

/* ------------------------------------------------------------------
   Zod schema
   ------------------------------------------------------------------ */

/**
 * Code postal :
 * - champ optionnel
 * - si renseigné, doit être un code postal français valide (5 chiffres)
 */
const schema = z
  .string()
  .trim()
  .refine(
    (v) => v.length === 0 || /^\d{5}$/.test(v),
    "Le code postal doit comporter exactement 5 chiffres"
  );

/* ------------------------------------------------------------------
   Props
   ------------------------------------------------------------------ */

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export function ProjectPostalCodeField({
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

    // Toujours propager la valeur (UX non bloquante)
    onChange(v);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Code postal
      </label>

      <div className="md:col-span-5">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className="h-9 w-full rounded-md border px-3 text-sm disabled:opacity-50"
          value={value}
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
