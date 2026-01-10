

"use client";

import { useState } from "react";
import { z } from "zod";

/* ------------------------------------------------------------------
   Zod schema
   ------------------------------------------------------------------ */

const schema = z
  .string()
  .trim()
  .max(1000, "Le commentaire ne doit pas dépasser 1000 caractères");

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

export function ProjectCommentairesField({
  value,
  onChange,
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
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Commentaires
      </label>

      <div className="md:col-span-5">
        <textarea
          className="min-h-20 w-full rounded-md border px-3 py-2 text-sm"
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
