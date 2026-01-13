

"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string; // 👈 AJOUT ICI
};

export function LotTravNameField({ value, onChange, error }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        Nom du lot
      </label>

      <div className="md:col-span-5">

      <input
        type="text"
        className={`border rounded px-3 py-2 ${
          error ? "border-red-500" : ""
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* 👇 AFFICHAGE DE L’ERREUR JUSTE ICI */}
      {error && (
        <span className="text-sm text-red-600">
          {error}
        </span>
      )}
    </div>
    </div>

  );
}
