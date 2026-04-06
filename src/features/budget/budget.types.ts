

// src/domain/budget/budget-types.ts

import type { RevenueTypeId } from "@/domain/revenus/revenue-types.catalog";
import type { CentreCoutFamilleId } from "@/domain/centre-cout/centre-cout-familles.catalog";
import type { BudgetKind } from "@/domain/budget/budget-kind";

export interface BudgetView {
  id: string;

  clientId: string;
  clientNom: string | null;

  centrecoutId: string | null;
  centrecoutCode: string | null;
  centrecoutLibelle: string | null;

  kind: BudgetKind;

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

  kind: BudgetKind;

  ccid: string | null;
  cccode: string | null;
  cclibelle: string | null;
  familleid: CentreCoutFamilleId | null;

  revenuetypeid: RevenueTypeId | null;

  amountHTEur: number;

  sortKey: string;
};