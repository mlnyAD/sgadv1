

import type { ColumnSelectorItem } from "@/components/table/ColumnSelector";

export const InvoiceSelectableColumns: ColumnSelectorItem[] = [
  { key: "id", label: "id facture", visible: false },
  { key: "dateFacture", label: "Date facture", visible: true },
  { key: "exerciceCode", label: "Exercice", visible: true },
  { key: "societeNom", label: "Tiers", visible: true },
  { key: "designation", label: "Désignation", visible: true },
  { key: "montantTtc", label: "Montant TTC", visible: true },
  { key: "datePaiement", label: "Payée", visible: true },
  // "actions" toujours visible
];