

// src/domain/_db/rows.ts

import type { Tables, TablesInsert, TablesUpdate } from "@/lib/supabase/database.types";

/* ================================================================== */
/* VIEWS (READ)                                                        */
/* ================================================================== */

export type OperateurRow = Tables<"vw_operateur_view">;
export type OperClientRow = Tables<"vw_operateur_client_view">;
export type ClientRow = Tables<"vw_client_view">;

export type ExerciceRow = Tables<"vw_exercice_view">;
export type CentreCoutRow = Tables<"vw_centre_cout_view">;
export type SocieteRow = Tables<"vw_societe_view">;

export type InvoiceSalesRow = Tables<"vw_invoice_sales_view">;
export type InvoicePurchaseRow = Tables<"vw_invoice_purchase_view">;

export type BudgetRow = Tables<"vw_budget_view">;

/* ================================================================== */
/* TABLES (WRITE)                                                      */
/* ================================================================== */

export type OperateurInsert = TablesInsert<"operateur">;
export type OperateurUpdate = TablesUpdate<"operateur">;

export type OperateurClientInsert = TablesInsert<"operateur_client">;
export type OperateurClientUpdate = TablesUpdate<"operateur_client">;

export type ClientInsert = TablesInsert<"client">;
export type ClientUpdate = TablesUpdate<"client">;

export type ExerciceInsert = TablesInsert<"exercice">;
export type ExerciceUpdate = TablesUpdate<"exercice">;

export type CentreCoutInsert = TablesInsert<"centre_cout">;
export type CentreCoutUpdate = TablesUpdate<"centre_cout">;

export type SocieteInsert = TablesInsert<"societe">;
export type SocieteUpdate = TablesUpdate<"societe">;

export type InvoiceInsert = TablesInsert<"invoice">;
export type InvoiceUpdate = TablesUpdate<"invoice">;

export type InvoiceSalesInsert = TablesInsert<"invoice_sales">;
export type InvoiceSalesUpdate = TablesUpdate<"invoice_sales">;

export type InvoicePurchaseInsert = TablesInsert<"invoice_purchase">;
export type InvoicePurchaseUpdate = TablesUpdate<"invoice_purchase">;

export type BudgetInsert = TablesInsert<"budget">;
export type BudgetUpdate = TablesUpdate<"budget">;