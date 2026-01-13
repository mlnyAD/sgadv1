

// ui/lottrav/fields/LotTravStatusField.tsx
"use client";

import { LOTTRAV_STATUS_CATALOG, LotTravStatusId } from "@/domain/lottrav/lottrav.catalog";

type Props = {
  value: LotTravStatusId;
  onChange: (value: LotTravStatusId) => void;
  error?: string;
};

export function LotTravStatusField({ value, onChange, error }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Etat
      </label>

      <div className="md:col-span-5">

        <select
          value={String(value)}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (!Number.isNaN(v)) {
              onChange(v as LotTravStatusId);
            }
          }}
        >
          {LOTTRAV_STATUS_CATALOG.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>

        {error && (
          <span className="text-sm text-red-600">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}
