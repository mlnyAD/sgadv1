

"use client";

import { ChangeEvent } from "react";

interface Props {
  start: string | null;
  value: string | null;
  onChange: (value: string | null) => void;
}

export function LicenceEndDateField({
  start,
  value,
  onChange,
}: Props) {
  const error =
    start && value && value < start
      ? "La date de fin doit être postérieure au début"
      : null;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value || null);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Fin
      </label>

      <input
        type="date"
        className="md:col-span-5 h-9 w-full rounded-md border px-3 text-sm"
        value={value ?? ""}
        onChange={handleChange}
      />

      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
