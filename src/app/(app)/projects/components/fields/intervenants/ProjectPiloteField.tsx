

"use client";

import { useState } from "react";
import { z } from "zod";

/* ------------------------------------------------------------------
   Zod schema
   ------------------------------------------------------------------ */

/**
 * Pilote du projet :
 * - champ optionnel
 * - nom libre
 * - minimum 2 caractères si renseigné
 */
const schema = z
  .string()
  .trim()
  .max(255, "Le nom du pilote doit comporter au maximum 255 caractères")
  .refine(
    (v) => v.length === 0 || v.length >= 2,
    "Le nom du pilote doit comporter au moins 2 caractères"
  );

/* ------------------------------------------------------------------
   Props
   ------------------------------------------------------------------ */

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
}


/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export function ProjectPiloteField({
  value,
  onChange,
}: Props) {
  const [error, setError] = useState<string | null>(null);

function handleChange(v: string) {
  const trimmed = v.trim();

  // Validation uniquement si renseigné
  if (trimmed.length > 0) {
    const parsed = schema.safeParse(trimmed);

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
    } else {
      setError(null);
    }
  } else {
    setError(null);
  }

  // Conversion UI -> Form
  onChange(trimmed === "" ? null : trimmed);
}

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Pilote du projet
      </label>

      <div className="md:col-span-5">
        <input
          type="text"
          className="h-9 w-full rounded-md border px-3 text-sm disabled:opacity-50"
          value={value ?? ""}
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
