"use client";

import { CONFIG_TYPES } from "@/domain/config/config.constants";

export default function ConfigTypeField({
  typeId,
  onChange,
  error,
}: {
  value: string;
  typeId: number;
  onChange: (nom: string, id: number) => void;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">Type</label>

      <select
        className={`border p-2 rounded ${error ? "border-red-500" : ""}`}
        value={typeId}
        onChange={(e) => {
          const id = Number(e.target.value);
          const obj = CONFIG_TYPES.find((x) => x.id === id);
          onChange(obj?.label ?? "", id);
        }}
      >
        <option value="">Choisir un type</option>
        {CONFIG_TYPES.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
