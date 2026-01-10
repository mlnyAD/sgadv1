

"use client";

import { useState } from "react";
import { z } from "zod";

/* ------------------------------------------------------------------
   Zod schema
   ------------------------------------------------------------------ */

/**
 * L'adresse du projet :
 * - peut être vide (création / saisie progressive)
 * - si renseignée, doit faire au moins 2 caractères
 */
const schema = z
  .string()
  .trim()
  .max(255, "L'adresse du projet doit comporter au maximum 255 caractères")
  .refine(
    (v) => v.length === 0 || v.length >= 2,
    "L'adresse du projet doit comporter au moins 2 caractères"
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

export function ProjectAddressField({
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

    // Toujours propager la valeur (UX fluide)
    onChange(v);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Adresse du projet
      </label>

      <div className="md:col-span-5">
        <input
          type="text"
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
