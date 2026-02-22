

"use client";

interface Props {
  value: number;
  onChange: (value: number) => void;
  error?: string | null;
}

export function CompteOrdreField({ value, onChange, error }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Ordre
      </label>

      <div className="md:col-span-5">
        <input
          type="number"
          className="h-9 w-full rounded-md border px-3 text-sm"
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(Number(e.target.value))}
          min={1}
          step={1}
        />

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}