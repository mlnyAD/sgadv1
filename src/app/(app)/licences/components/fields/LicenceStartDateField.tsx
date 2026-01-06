

"use client";

import { ChangeEvent } from "react";
import { z } from "zod";

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
}

const schema = z.string().min(1, "La date de début est obligatoire");

export function LicenceStartDateField({ value, onChange }: Props) {
  const parsed = schema.safeParse(value);
  const error = parsed.success ? null : parsed.error.issues[0].message;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value || null);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Début
      </label>

      <input
        type="date"
        className="md:col-span-5 h-9 w-full rounded-md border px-3 text-sm"
        value={value ?? ""}
        onChange={handleChange}
      />

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
