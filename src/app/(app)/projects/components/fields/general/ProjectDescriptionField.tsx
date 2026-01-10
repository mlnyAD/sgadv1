

"use client";

import { useState } from "react";
import { z } from "zod";

/* ------------------------------------------------------------------
   Zod schema
   ------------------------------------------------------------------ */

/**
 * Description du projet :
 * - champ optionnel
 * - si renseigné, minimum 2 caractères
 * - longueur maximale contrôlée
 */
const schema = z
  .string()
  .trim()
  .max(2000, "La description du projet doit comporter au maximum 2000 caractères")
  .refine(
    (v) => v.length === 0 || v.length >= 2,
    "La description du projet doit comporter au moins 2 caractères"
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

export function ProjectDescriptionField({
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
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Description du projet
      </label>

      <div className="md:col-span-5">
        <textarea
          rows={3}
          className="w-full rounded-md border px-3 py-2 text-sm disabled:opacity-50"
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
