

import type { ColumnSelectorItem } from "@/components/table/ColumnSelector";

export const CentreCoutSelectableColumns: ColumnSelectorItem[] = [
  { key: "id", label: "Id du centre de coût", visible: false },
  { key: "code", label: "Code", visible: true },
  { key: "libelle", label: "Libellé", visible: true },
  { key: "domaineLibelle", label: "Domaine", visible: true },
  { key: "actif", label: "Statut", visible: true },
  // "actions" toujours visible
];
