

"use client";

import { useState } from "react";
import { z } from "zod";

/* ------------------------------------------------------------------
   Zod schema
   ------------------------------------------------------------------ */

const schema = z
  .string()
  .trim()
  .regex(
    /^\d{3}\s\d{3}\s\d{3}$/,
    "Le SIREN doit être au format 123 456 789"
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

export function ClientSirenField({
  value,
  onChange,
}: Props) {
  const [error, setError] = useState<string | null>(null);

  function handleChange(v: string) {
    // Champ optionnel : vide = null
    if (!v.trim()) {
      setError(null);
      onChange(null);
      return;
    }

    const parsed = schema.safeParse(v);

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
    } else {
      setError(null);
    }

    onChange(v);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        SIREN
      </label>

      <div className="md:col-span-5">
        <input
          type="text"
          placeholder="123 456 789"
          className="h-9 w-full rounded-md border px-3 text-sm"
          value={value ?? ""}
          onChange={(e) => handleChange(e.target.value)}
        />

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
