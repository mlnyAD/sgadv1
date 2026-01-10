

"use client";

import { useState } from "react";
import { z } from "zod";

/* ------------------------------------------------------------------
   Zod schema
   ------------------------------------------------------------------ */

const schema = z
  .string()
  .trim()
  .max(
    2000,
    "Les commentaires ne peuvent pas dépasser 2000 caractères"
  );

/* ------------------------------------------------------------------
   Props
   ------------------------------------------------------------------ */

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
}

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export function ProjectChoixStCommentsField({
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

    onChange(v.trim() ? v : null);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Commentaires (sous-traitants)
      </label>

      <div className="md:col-span-5">
        <textarea
          rows={4}
          className="w-full rounded-md border px-3 py-2 text-sm resize-vertical disabled:opacity-50"
          value={value ?? ""}
          disabled={disabled}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Justification de la décision concernant les sous-traitants"
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
