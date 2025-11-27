"use client";

import { etatsConfigStr } from "@/utils/constantes";

export default function ConfigTypeField({
  value,
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
          const obj = etatsConfigStr.find((x) => x.id === id);
          onChange(obj?.nom ?? "", id);
        }}
      >
        <option value="">Choisir un type</option>
        {etatsConfigStr.map((t) => (
          <option key={t.id} value={t.id}>
            {t.nom}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
