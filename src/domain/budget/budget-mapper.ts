

// src/domain/budget/budget-mapper.ts
import type { BudgetView } from "./budget-types";
import { toRevenueTypeId } from "@/domain/invoice/invoice-types.catalog";
import { toCentreCoutFamilleId } from "@/domain/centre-cout/centre-cout-familles.catalog";
import { fromBudgetKindDb } from "@/domain/budget/budget-kind";
import type { BudgetKindDb } from "@/domain/budget/budget-kind";

// Type exact basé sur les colonnes que tu as listées pour vw_budget_view
export type VwBudgetViewRow = {
  bud_id: string | null;
  clt_id: string | null;
  clt_nom: string | null;

  exer_id: string | null;
  exer_code: string | null;

bud_kind: BudgetKindDb | null; // "SALES" | "PURCHASE"

  revenue_type_id: number | null;

  cc_id: string | null;
  cc_code: string | null;
  cc_libelle: string | null;

  famille_id: number | null;

  bud_amount_ht_eur: number | null;

  oper_id: string | null;
  oper_nom: string | null;
  oper_prenom: string | null;

  created_at: string | null;
  updated_at: string | null;
};

export function mapBudgetViewRowToView(row: VwBudgetViewRow): BudgetView {
  if (!row.bud_id) throw new Error("vw_budget_view: bud_id manquant (ligne non éditable)");
  if (!row.clt_id) throw new Error("vw_budget_view: clt_id manquant");
  if (!row.exer_id) throw new Error("vw_budget_view: exer_id manquant");
  if (!row.bud_kind) throw new Error("vw_budget_view: bud_kind manquant");
  if (!row.created_at || !row.updated_at) throw new Error("vw_budget_view: timestamps manquants");

  if (!row.bud_kind) throw new Error("vw_budget_view: bud_kind manquant");

const kind = fromBudgetKindDb(row.bud_kind); // ✅ "SALES"/"PURCHASE" -> 1/2

  const operNom = [row.oper_prenom, row.oper_nom].filter(Boolean).join(" ").trim();

  return {
    id: row.bud_id,

    clientId: row.clt_id,
    clientNom: row.clt_nom ?? null,

    centrecoutId: row.cc_id ?? null,
    centrecoutCode: row.cc_code ?? null,
    centrecoutLibelle: row.cc_libelle ?? null,

    kind,

    exerId: row.exer_id,
    exerCode: row.exer_code ?? null,

    operId: row.oper_id ?? null,
    operNom: operNom.length ? operNom : null,

    familleId: row.famille_id != null ? toCentreCoutFamilleId(row.famille_id) : null,
    revenueTypeId: row.revenue_type_id != null ? toRevenueTypeId(row.revenue_type_id) : null,

    amountHTEur: row.bud_amount_ht_eur ?? 0,

    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}