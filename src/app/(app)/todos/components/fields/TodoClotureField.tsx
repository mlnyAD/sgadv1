interface TodoClotureFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function TodoClotureField({
  value,
  onChange,
}: TodoClotureFieldProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">Date de cloture</label>

      <div className="md:col-span-5">
        <input
          type="Date"
          className="h-9 w-full rounded-md border px-3 text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
