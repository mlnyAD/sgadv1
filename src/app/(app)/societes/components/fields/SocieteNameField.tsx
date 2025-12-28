
"use client";

import { useState } from "react";
import { z } from "zod";

const schema = z
  .string()
  .trim()
  .min(2, "Le nom de la société doit être supérieur à 2 caractères")
  .max(255, "Le nom dela société est trop long");

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SocieteNameField({ value, onChange }: Props) {
  const [error, setError] = useState<string | null>(null);

  function handleChange(v: string) {
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
      <label className="md:col-span-1 text-sm font-medium">Nom</label>

      <div className="md:col-span-5">
        <input
          type="text"
          className="h-9 w-full rounded-md border px-3 text-sm"
          value={value}
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
