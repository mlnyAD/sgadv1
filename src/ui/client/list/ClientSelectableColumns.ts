

import type { ColumnSelectorItem } from "@/components/table/ColumnSelector";

export const ClientSelectableColumns: ColumnSelectorItem[] = [
  { key: "id", label: "id du client", visible: false },
  { key: "nom", label: "Nom du client", visible: true },
  { key: "code", label: "Code", visible: true },
  { key: "adresse", label: "Adresse", visible: true },
  { key: "codePostal", label: "Code postal", visible: true },
  { key: "ville", label: "Ville", visible: true },
  { key: "pays", label: "Pays", visible: true },
  { key: "email", label: "Email", visible: true },
  { key: "telephone", label: "Téléphone", visible: true },
  { key: "status", label: "Statut", visible: true, },
  // "actions" toujours visible
];
