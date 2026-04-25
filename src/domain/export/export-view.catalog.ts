

// src/domain/export/export-view.catalog.ts

export const EXPORT_VIEWS = [
  {
    key: "budget",
    label: "Budget",
    viewName: "vw_budget_view",
    filters: {
      client: "clt_id",
      exercice: "exer_id",
    },
  },
  {
    key: "fiscalite",
    label: "Versements fiscaux",
    viewName: "vw_fisc_view",
    filters: {
      client: "fisc_clt_id",
      exercice: "fisc_exer_id",
    },
  },
  {
    key: "achats",
    label: "Achats",
    viewName: "vw_purchase_view",
    filters: {
      client: "clt_id",
      exercice: "exer_id",
    },
  },
  {
    key: "factures",
    label: "Factures",
    viewName: "vw_sales_view",
    filters: {
      client: "clt_id",
      exercice: "exer_id",
    },
  },
  {
    key: "remboursements",
    label: "Remboursements",
    viewName: "vw_remboursement_view",
    filters: {
      client: "clt_id",
      exercice: "exer_id",
    },
  },
  {
    key: "exercices",
    label: "Exercices",
    viewName: "vw_exercice_view",
    filters: {
      client: "clt_id",
    },
  },
  {
    key: "societes",
    label: "Sociétés",
    viewName: "vw_societe_view",
    filters: {
      client: "clt_id",
    },
  },
  {
    key: "tresorerieComptes",
    label: "Trésorerie - Comptes",
    viewName: "vw_tro_compte_view",
    filters: {
      client: "tro_clt_id",
    },
  },
  {
    key: "tresorerieSoldes",
    label: "Trésorerie - Soldes mensuels",
    viewName: "vw_tro_soldes_mensuels_view",
    filters: {
      client: "tro_clt_id",
      exercice: "tro_exer_id",
    },
  },
] as const;

export type ExportViewKey = (typeof EXPORT_VIEWS)[number]["key"];

export function getExportViewConfig(key: ExportViewKey) {
  return EXPORT_VIEWS.find((view) => view.key === key) ?? null;
}