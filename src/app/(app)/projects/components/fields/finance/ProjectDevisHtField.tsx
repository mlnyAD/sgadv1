

"use client";

import { useState } from "react";
import { z } from "zod";

/* ------------------------------------------------------------------
   Zod schema
   ------------------------------------------------------------------ */

/**
 * Montant du devis HT :
 * - champ optionnel
 * - nombre positif
 * - 2 décimales max
 *
 * Remarque: on évite invalid_type_error pour compatibilité Zod.
 */
const schema = z
  .coerce
  .number()
  .nonnegative("Le montant doit être positif")
  .refine(
    (v) => Math.round(v * 100) === v * 100,
    "Le montant ne peut pas comporter plus de 2 décimales"
  );

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

export function ProjectDevisHtField({
  value,
  onChange,
  disabled,
}: Props) {
  const [error, setError] = useState<string | null>(null);

  function handleChange(raw: string) {
    // vide => null
    if (raw.trim() === "") {
      setError(null);
      onChange(null);
      return;
    }

    // accepte "," ou "."
    const normalized = raw.replace(",", ".");

    const parsed = schema.safeParse(normalized);

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      // on conserve la valeur précédente côté state métier (pas d’écriture incohérente)
      return;
    }

    setError(null);
    onChange(parsed.data);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Montant du devis HT
      </label>

      <div className="md:col-span-5">
        <input
          type="text"
          inputMode="decimal"
          className="h-9 w-full rounded-md border px-3 text-sm disabled:opacity-50"
          value={value ?? ""}
          disabled={disabled}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="0,00"
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
