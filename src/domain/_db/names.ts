

export const DB = {
  views: {
    exercice: "vw_exercice_view",
    invoicePurchase: "vw_invoice_purchase_view",
    remboursement: "vw_remboursement_view",
    remboursementTotal: "vw_remboursement_total_by_exercice",
  },
  tables: {
    remboursement: "remboursement",
  },
} as const;