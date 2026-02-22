

import type { ColumnSelectorItem } from "@/components/table/ColumnSelector";

export const CompteSelectableColumns: ColumnSelectorItem[] = [
  { key: "id", label: "id compte", visible: false },
  { key: "nom", label: "Nom du compte", visible: true },
  { key: "ordre", label: "Ordre", visible: true },
  { key: "inclusGlobal", label: "Inclus global", visible: true },
  { key: "actif", label: "Actif", visible: true },
  { key: "societeId", label: "Société", visible: false },
  // "actions" toujours visible
];