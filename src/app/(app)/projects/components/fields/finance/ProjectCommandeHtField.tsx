

"use client";

import { useState } from "react";
import { z } from "zod";

/* ------------------------------------------------------------------
   Zod schema
   ------------------------------------------------------------------ */

/**
 * Montant de la commande HT :
 * - champ optionnel
 * - nombre positif
 * - 2 décimales max
 */
const schema = z
  .number()
  .nonnegative("Le montant doit être positif")
  .refine(
    (v) => Math.round(v * 100) === v * 100,
    "Le montant ne peut pas comporter plus de 2 décimales"
  )
  .nullable();

/* ------------------------------------------------------------------
   Props
   ------------------------------------------------------------------ */

interface Props {
  value: number | null;
  onChange: (value: number | null) => void;
  disabled?: boolean;
}

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export function ProjectCommandeHtField({
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

    const num = Number(raw.replace(",", "."));
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
        Montant de la commande HT
      </label>

      <div className="md:col-span-5">
        <input
          type="number"
          inputMode="decimal"
          step="0.01"
          min="0"
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
