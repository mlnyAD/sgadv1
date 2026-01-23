

"use client";

interface Props {
  actif?: boolean | null;
  onChange?: (actif: boolean | null) => void;
}

export function ClientFiltersClient({
  actif = null,
  onChange,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">
        Clients
      </label>

      <select
        className="h-9 rounded-md border px-2 text-sm"
        value={
          actif === null
            ? "all"
            : actif
            ? "actif"
            : "inactif"
        }
        onChange={(e) => {
          const v = e.target.value;

          const next =
            v === "all" ? null : v === "actif";

          onChange?.(next);
        }}
      >
        <option value="all">Tous</option>
        <option value="actif">Actifs</option>
        <option value="inactif">Inactifs</option>
      </select>
    </div>
  );
}
