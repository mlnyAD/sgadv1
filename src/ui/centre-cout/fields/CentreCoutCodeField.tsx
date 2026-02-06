

interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}

export function CentreCoutCodeField({
  value,
  onChange,
  error,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Code centre de coût
      </label>

      <div className="md:col-span-5">
        <input
          type="text"
          className="h-9 w-full rounded-md border px-3 text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
