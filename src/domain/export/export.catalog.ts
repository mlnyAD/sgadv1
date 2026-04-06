

import type { ExportDefinition } from "./export.types";

export const EXPORTS: ExportDefinition[] = [
  {
    key: "purchase",
    label: "Factures fournisseurs",
    view: "vw_purchase_view",
    scope: "METIER",
    filters: [
      {
        type: "exercice",
        label: "Exercice",
        column: "exer_code",
      },
    ],
    formats: ["xlsx"],
    columns: [
      { key: "pur_purchase_date", header: "Date" },
      { key: "pur_reference", header: "Numéro" },
      { key: "soc_nom", header: "Société" },
      { key: "cc_libelle", header: "Centre de coût" },
      { key: "pur_amount_ht", header: "Montant HT" },
      { key: "pur_amount_tax", header: "TVA" },
      { key: "pur_amount_ttc", header: "Montant TTC" },
    ],
  },

  {
    key: "sales",
    label: "Factures clients",
    view: "vw_sales_view",
    scope: "METIER",
    filters: [
      {
        type: "exercice",
        label: "Exercice",
        column: "exer_code",
      },
    ],
    formats: ["xlsx"],
    columns: [
      { key: "sal_invoice_date", header: "Date" },
      { key: "sal_reference", header: "Numéro" },
      { key: "clt_nom", header: "Client" },
      { key: "sal_revenue_type", header: "Type revenu" },
      { key: "sal_amount_ht", header: "Montant HT" },
      { key: "sal_amount_tax", header: "TVA" },
      { key: "sal_amount_ttc", header: "Montant TTC" },
    ],
  },
{
  key: "budget",
  label: "Budgets",
  view: "vw_budget_view",
  scope: "METIER",
  filters: [
    {
      type: "exercice",
      label: "Exercice",
      column: "exer_code",
    },
  ],
  formats: ["xlsx"],
  columns: [
    { key: "cc_libelle", header: "Centre de coût" },
    { key: "bud_amount_ht_eur", header: "Budget HT €" },
  ],
},
  {
    key: "remboursement",
    label: "Remboursements",
    view: "vw_remboursement_view",
    scope: "METIER",
    filters: [
      {
        type: "exercice",
        label: "Exercice",
        column: "exer_code",
      },
    ],
    formats: ["xlsx"],
    columns: [
      { key: "rbt_date", header: "Date" },
      { key: "rbt_amount", header: "Montant" },
      { key: "rbt_commentaires", header: "Commentaires" },
    ],
  },
];