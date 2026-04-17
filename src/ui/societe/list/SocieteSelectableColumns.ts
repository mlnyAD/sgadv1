

import type { ColumnSelectorItem } from "@/components/table/ColumnSelector";

export const SocieteSelectableColumns: ColumnSelectorItem[] = [
  { key: "code", label: "Code", visible: true },
  { key: "nom", label: "Nom", visible: true },
  { key: "ville", label: "Ville", visible: true },
  { key: "adresse", label: "Adresse", visible: false },
  { key: "siren", label: "SIREN", visible: false },
  { key: "client", label: "Client", visible: true },
  { key: "fournisseur", label: "Fournisseur", visible: true },
  // "actions" reste toujours visible
];