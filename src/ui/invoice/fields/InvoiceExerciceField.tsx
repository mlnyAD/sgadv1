

interface Option {
  value: string;
  label: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  options: Option[];
}

export function InvoiceExerciceField({ value, onChange, error, options }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Exercice
      </label>

      <div className="md:col-span-5">
        <select
          className="h-9 w-full rounded-md border px-2 text-sm bg-background"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">— Sélectionner —</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}