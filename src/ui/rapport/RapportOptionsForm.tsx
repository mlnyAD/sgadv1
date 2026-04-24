

import type { RapportOptionKey } from "@/domain/rapport/types";

type Props = {
  exerId: string;
  exerCode: string;
  options: RapportOptionKey[];
  onChangeExercice: (exerId: string, exerCode: string) => void;
  onToggleOption: (value: RapportOptionKey) => void;
};

const OPTIONAL_SECTIONS: Array<{ key: RapportOptionKey; label: string }> = [
  { key: "bilanFinancier", label: "Bilan financier" },
  { key: "detailBudget", label: "Détail du budget (achats et ventes)" },
];

export function RapportOptionsForm({
  exerId,
  exerCode,
  options,
  onToggleOption,
}: Props) {
  void exerId;

  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
        <div className="flex flex-col gap-2 text-sm font-medium">
          <span>Exercice</span>
          <div className="rounded-md border bg-slate-50 px-3 py-2">
            {exerCode || "Non sélectionné"}
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Rubriques optionnelles</span>

          {OPTIONAL_SECTIONS.map((item) => (
            <label key={item.key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.includes(item.key)}
                onChange={() => onToggleOption(item.key)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}