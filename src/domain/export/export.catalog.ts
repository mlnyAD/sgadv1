

import type { ExportDefinition } from "./export.types";

export const EXPORTS: ExportDefinition[] = [
  {
    key: "invoice-purchase",
    label: "Factures fournisseurs",
    view: "vw_invoice_purchase_view",
    scope: "METIER",
    filters: [
      {
        type: "exercice",
        label: "Exercice",
        column: "exer_code",
      },
      {
        type: "dateRange",
        label: "Période",
        fromColumn: "inv_due_date",
      },
    ],
    formats: ["xlsx"],
    columns: [
      { key: "inv_due_date", header: "Date" },
      { key: "inv_reference", header: "Numéro" },
      { key: "soc_nom", header: "Société" },
      { key: "cc_libelle", header: "Centre de coût" },
      { key: "inv_amount_ht", header: "Montant HT" },
      { key: "inv_amount_tax", header: "TVA" },
      { key: "inv_amount_ttc", header: "Montant TTC" },
    ],
  },

  {
    key: "invoice-sales",
    label: "Factures clients",
    view: "vw_invoice_sales_view",
    scope: "METIER",
    filters: [
      {
        type: "exercice",
        label: "Exercice",
        column: "exer_code",
      },
      {
        type: "dateRange",
        label: "Période",
        fromColumn: "inv_due_date",
      },
    ],
    formats: ["xlsx"],
    columns: [
      { key: "inv_due_date", header: "Date" },
      { key: "inv_reference", header: "Numéro" },
      { key: "clt_nom", header: "Client" },
      { key: "invs_revenue_type", header: "Type revenu" },
      { key: "inv_amount_ht", header: "Montant HT" },
      { key: "inv_amount_tax", header: "TVA" },
      { key: "inv_amount_ttc", header: "Montant TTC" },
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