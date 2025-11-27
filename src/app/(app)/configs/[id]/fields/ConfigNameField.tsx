"use client";

export default function ConfigNameField({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">Nom</label>
      <input
        className={`border p-2 rounded ${error ? "border-red-500" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}