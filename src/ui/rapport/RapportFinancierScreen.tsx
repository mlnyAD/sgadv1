

import type {
  RapportFilters,
  RapportFinancierViewModel,
  RapportOptionKey,
} from "@/domain/rapport/types";
import { RapportHeader } from "./RapportHeader";
import { RapportOptionsForm } from "./RapportOptionsForm";
import { RapportSection } from "./RapportSection";
import { RapportToolbar } from "./RapportToolbar";

type Props = {
  filters: RapportFilters;
  viewModel: RapportFinancierViewModel | null;
  loading: boolean;
  error: string | null;
  onChangeExercice: (exerId: string, exerCode: string) => void;
  onToggleOption: (value: RapportOptionKey) => void;
  onExportDocx: () => void | Promise<void>;
};

export function RapportFinancierScreen({
  filters,
  viewModel,
  loading,
  error,
  onChangeExercice,
  onToggleOption,
  onExportDocx,
}: Props) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <RapportToolbar onExportDocx={onExportDocx} />

<RapportOptionsForm
  exerId={filters.exerId}
  exerCode={filters.exerCode}
  options={filters.options}
  onChangeExercice={onChangeExercice}
  onToggleOption={onToggleOption}
/>
      {loading && <div>Chargement…</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {viewModel && (
        <>
          <RapportHeader
            clientName={viewModel.clientName}
            exercice={viewModel.exercice}
            dateEdition={viewModel.dateEdition}
          />

<div className="grid grid-cols-1 gap-4 xl:grid-cols-2 print:grid-cols-2">
  {viewModel.sections
    .filter((section) => section.visible)
    .map((section) => (
      <RapportSection key={section.key} section={section} />
    ))}
</div>        </>
      )}
    </div>
  );
}