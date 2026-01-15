

"use client";

type Props = {
  value: number;
  onChange: (value: string) => void;
  error?: string;
};

export function TaskAvancementField({ value, onChange, error }: Props) {
  return (

    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Avancement
      </label>

     <div className="md:col-span-5">
      <input
        type="number"
        className={`h-9 w-full border rounded-md px-3 text-sm ${
          error ? "border-red-500" : ""
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {error && (
        <span className="text-sm text-red-600">
          {error}
        </span>
      )}
      </div>
    </div>
  );
}

