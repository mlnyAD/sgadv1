

import { REVENUE_TYPES, type RevenueTypeId } from "@/domain/invoice/invoice-types.catalog";

interface Props {
  value: RevenueTypeId | null;
  onChange: (value: RevenueTypeId | null) => void;
  error?: string | null;
}

export function InvoiceRevenueTypeIdField({ value, onChange, error }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">Type de revenu</label>

      <div className="md:col-span-5">
        <select
          className="h-9 w-full rounded-md border px-3 text-sm"
          value={value ?? ""}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "") return onChange(null);
            const n = Number(v);
            const ok = REVENUE_TYPES.some((x) => x.id === n);
            onChange(ok ? (n as RevenueTypeId) : null);
          }}
        >
          <option value="">—</option>
          {REVENUE_TYPES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.libelle}
            </option>
          ))}
        </select>

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}