

"use client";

import { ChangeEvent } from "react";
import { z } from "zod";

export interface ClientOption {
  id: string;
  label: string;
}

interface Props {
  value: string | null;
  clients: ClientOption[];
  onChange: (value: string | null) => void;
}

const schema = z
  .string()
  .min(1, "Le client est obligatoire");

export function LicenceClientField({
  value,
  clients,
  onChange,
}: Props) {
  const parsed = schema.safeParse(value);
  const error = parsed.success ? null : parsed.error.issues[0].message;

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange(e.target.value || null);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Client
      </label>

      <select
        className="md:col-span-5 h-9 w-full rounded-md border px-3 text-sm"
        value={value ?? ""}
        onChange={handleChange}
      >
        <option value="">Sélectionner…</option>

        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
