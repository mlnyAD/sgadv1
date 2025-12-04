"use client";

import { ConfigEnum } from "@/domain/config/config.enum";

interface ConfigTypeFieldProps {
  typeId: number | "";                       // valeur actuelle ("" lors d'une création)
  onChange: (label: string, id: number) => void;
  error?: string;
}

export default function ConfigTypeField({
  typeId,
  onChange,
  error,
}: ConfigTypeFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">Type</label>

      <select
        className={`border p-2 rounded ${error ? "border-red-500" : ""}`}
        value={typeId}
        onChange={(e) => {
          const id = Number(e.target.value);

          // valeur vide → pas de type sélectionné
          if (!id) {
            onChange("", 0);
            return;
          }

          const item = ConfigEnum.find((x) => x.id === id);
          onChange(item?.label ?? "", id);
        }}
      >
        <option value="">Choisir un type</option>
        {ConfigEnum.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
