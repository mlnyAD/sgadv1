

// src/ui/export/ExportScreen.tsx
 
import type { ExportViewKey } from "@/domain/export/export-view.catalog";

type ExportOption = {
  key: ExportViewKey;
  label: string;
};

type ExerciseOption = {
  exerId: string;
  exerCode: string;
};

type Props = {
  options: ExportOption[];
  selectedKeys: ExportViewKey[];
  exerciseOptions: ExerciseOption[];
  selectedExerId: string;
  exporting?: boolean;
  error?: string | null;
  onToggle: (key: ExportViewKey) => void;
  onChangeExercice: (exerId: string) => void;
  onExport: () => void;
};

export function ExportScreen({
  options,
  selectedKeys,
  exerciseOptions,
  selectedExerId,
  exporting = false,
  error,
  onToggle,
  onChangeExercice,
  onExport,
}: Props) {
  return (
    <div className="space-y-3 p-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Exports</h1>
        <p className="text-sm text-muted-foreground">
          Export XLSX des vues sélectionnées pour le client courant et
          l’exercice sélectionné.
        </p>
      </div>

      <div className="rounded-lg border bg-white p-3">
        <label className="flex flex-col gap-1 text-sm font-medium">
          <span>Exercice</span>
          <select
            value={selectedExerId}
            onChange={(event) => onChangeExercice(event.target.value)}
            className="h-9 rounded-md border px-3 text-sm"
          >
            {exerciseOptions.length === 0 ? (
              <option value="">Aucun exercice</option>
            ) : null}

            {exerciseOptions.map((exercise) => (
              <option key={exercise.exerId} value={exercise.exerId}>
                {exercise.exerCode}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="rounded-lg border bg-white divide-y">
        {options.map((option) => (
          <label
            key={option.key}
            className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm hover:bg-slate-50"
          >
            <input
              type="checkbox"
              checked={selectedKeys.includes(option.key)}
              onChange={() => onToggle(option.key)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>

      {error ? <div className="text-sm text-red-600">{error}</div> : null}

      <div className="flex justify-end">
        <button
          type="button"
          disabled={exporting || selectedKeys.length === 0 || !selectedExerId}
          onClick={onExport}
          className="rounded-md border px-4 py-2 text-sm font-medium disabled:opacity-50"
        >
          {exporting ? "Export en cours..." : "Exporter les données"}
        </button>
      </div>
    </div>
  );
}