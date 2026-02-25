

import type { ColumnSelectorItem } from "@/components/table/ColumnSelector";

export const FiscSelectableColumns: ColumnSelectorItem[] = [
  { key: "id", label: "id versement", visible: false },
  { key: "date", label: "Date", visible: true },
  { key: "typeId", label: "Type", visible: true },
  { key: "societeNom", label: "Société", visible: true },
  { key: "exerciceCode", label: "Exercice", visible: true },
  { key: "montant", label: "Montant", visible: true },
  { key: "commentaires", label: "Commentaires", visible: false },
  // "actions" toujours visible
];