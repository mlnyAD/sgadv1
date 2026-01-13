

import type { ColumnSelectorItem } from "@/components/table/ColumnSelector";

export const lotTravSelectableColumns: ColumnSelectorItem[] = [
  { key: "lottravId", label: "id du lot", visible: false },
  { key: "nom", label: "Nom du lot", visible: true },
  { key: "statusId", label: "Statut", visible: true },
  { key: "start", label: "Début", visible: true },
  { key: "end", label: "Fin", visible: true },
  { key: "responsableEmail", label: "Responsable", visible: true, },
  { key: "lastModified", label: "Modifié le", visible: false, },
  // "actions" toujours visible
];
