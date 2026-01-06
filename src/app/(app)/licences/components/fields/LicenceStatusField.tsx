

"use client";

import { ChangeEvent } from "react";
import { z } from "zod";
import { LICENCE_STATUS_CATALOG, LicenceStatus } from "@/domain/licence";

interface Props {
  value: LicenceStatus;
  onChange: (value: LicenceStatus) => void;
}

const schema = z.string().min(1, "Le statut est obligatoire");

export function LicenceStatusField({ value, onChange }: Props) {
  const parsed = schema.safeParse(value);
  const error = parsed.success ? null : parsed.error.issues[0].message;

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange(e.target.value as LicenceStatus);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Statut
      </label>

<select
  value={value}
  onChange={handleChange}
>
  {LICENCE_STATUS_CATALOG.map((s) => (
    <option key={s.id} value={s.id}>
      {s.label}
    </option>
  ))}
</select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
