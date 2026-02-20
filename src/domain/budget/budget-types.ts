

import type { InvoiceTypeId, RevenueTypeId } from "@/domain/invoice/invoice-types.catalog";
import type { CentreCoutFamilleId } from "@/domain/centre-cout/centre-cout-familles.catalog";

export interface BudgetView {
  id: string;

  clientId: string;
  clientNom: string | null;

  centrecoutId: string | null;
  centrecoutCode: string | null;
  centrecoutLibelle: string | null;

  kind: InvoiceTypeId; // ✅ 1 ou 2

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