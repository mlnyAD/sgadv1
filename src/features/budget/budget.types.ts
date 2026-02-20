

// src/domain/budget/budget-types.ts
import type { InvoiceTypeId, RevenueTypeId } from "@/domain/invoice/invoice-types.catalog";
import type { CentreCoutFamilleId } from "@/domain/centre-cout/centre-cout-familles.catalog";

export interface BudgetView {
  id: string;

  clientId: string;
  clientNom: string | null;

  centrecoutId: string | null;
  centrecoutCode: string | null;
  centrecoutLibelle: string | null;

  kind: InvoiceTypeId;                 // ✅ 1 ou 2

  exerId: string;
  exerCode: string | null;

  operId: string | null;
  operNom: string | null;

  familleId: CentreCoutFamilleId | null;

  revenueTypeId: RevenueTypeId | null;

  amountHTEur: number;

  created_at: string;
  updated_at: string;
}

export type BudgetDraftRow = {
  key: string;

  budid: string | null;
  exerid: string;

  kind: InvoiceTypeId; // 1 ventes, 2 achats

  // Achats
  ccid: string | null;
  cccode: string | null;
  cclibelle: string | null;
  familleid: CentreCoutFamilleId | null;

  // Ventes
  revenuetypeid: RevenueTypeId | null;

  amountHTEur: number;

  sortKey: string;
};