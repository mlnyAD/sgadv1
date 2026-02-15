

import {
  CENTRE_COUT_FAMILLES,
  CentreCoutFamilleId,
} from "@/domain/centre-cout/centre-cout-familles.catalog";

interface Props {
  value: CentreCoutFamilleId;
  onChange: (value: CentreCoutFamilleId) => void;
  error?: string | null;
}

export function CentreCoutFamilleField({
  value,
  onChange,
  error,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Famille
      </label>

      <div className="md:col-span-5">
        <select
          className="h-9 w-full rounded-md border px-2 text-sm"
          value={value ?? ""}
          onChange={(e) => {
            const v = Number(e.target.value);
            onChange(v as CentreCoutFamilleId);
          }}
        >
          <option value="" disabled>
            — Sélectionner une famille —
          </option>

          {CENTRE_COUT_FAMILLES.map((famille) => (
            <option key={famille.id} value={famille.id}>
              {famille.libelle}
            </option>
          ))}
        </select>

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
