

// src/features/budget/budget-skeleton.ts
import type { BudgetView } from "@/domain/budget/budget-types";
import type { CentreCoutViewRow } from "@/domain/centre-cout/centre-cout-repository";

import {
  REVENUE_TYPES,
  type InvoiceTypeId,
  type RevenueTypeId,
} from "@/domain/invoice/invoice-types.catalog";

import { toCentreCoutFamilleId, type CentreCoutFamilleId } from "@/domain/centre-cout/centre-cout-familles.catalog";
import type { BudgetDraftRow } from "./budget.types";

const KIND_SALES = 1 as InvoiceTypeId;
const KIND_PURCHASE = 2 as InvoiceTypeId;

function keySales(rt: RevenueTypeId) {
  return `k:${KIND_SALES}|rt:${rt}`;
}
function keyPurchase(ccid: string, fam: CentreCoutFamilleId) {
  return `k:${KIND_PURCHASE}|cc:${ccid}|fam:${fam}`;
}

export function buildBudgetSkeleton(params: {
  exerid: string;
  centresCout: CentreCoutViewRow[];
}): BudgetDraftRow[] {
  const { exerid, centresCout } = params;

  // 1) Ventes = 1 ligne par revenue_type_id
  const sales: BudgetDraftRow[] = REVENUE_TYPES.map((rt) => ({
    key: keySales(rt.id),
    budid: null,
    exerid,
    kind: KIND_SALES,

    ccid: null,
    cccode: null,
    cclibelle: null,
    familleid: null,

    revenuetypeid: rt.id,
    amountHTEur: 0,

    sortKey: `0|${String(rt.id).padStart(3, "0")}`,
  }));

  // 2) Achats = 1 ligne par centre de coût (avec famille)
  const purchase: BudgetDraftRow[] = centresCout
    .filter((cc) => !!cc.cc_id)
    .map((cc) => {
      const fam = toCentreCoutFamilleId(cc.famille_id ?? 8);
      return {
        key: keyPurchase(cc.cc_id!, fam),
        budid: null,
        exerid,
        kind: KIND_PURCHASE,

        ccid: cc.cc_id,
        cccode: cc.cc_code,
        cclibelle: cc.cc_libelle,
        familleid: fam,

        revenuetypeid: null,
        amountHTEur: 0,

        sortKey: `1|${cc.cc_code ?? ""}|${String(fam).padStart(2, "0")}`,
      };
    });

  return [...sales, ...purchase].sort((a, b) => a.sortKey.localeCompare(b.sortKey));
}

export function mergeExistingIntoSkeleton(params: {
  skeleton: BudgetDraftRow[];
  existing: BudgetView[];
}): BudgetDraftRow[] {
  const { skeleton, existing } = params;

  const existingMap = new Map<string, BudgetView>();

  for (const e of existing) {
    // Ici, e.kind est string chez toi. Il faut le normaliser en number.
    const kindNum = Number(e.kind) as InvoiceTypeId;

    if (kindNum === KIND_SALES && e.revenueTypeId) {
      existingMap.set(keySales(e.revenueTypeId as RevenueTypeId), e);
    }

    if (kindNum === KIND_PURCHASE && e.centrecoutId) {
      const fam = toCentreCoutFamilleId(e.familleId ?? 8);
      existingMap.set(keyPurchase(e.centrecoutId, fam), e);
    }
  }

  return skeleton.map((row) => {
    const hit = existingMap.get(row.key);
    if (!hit) return row;

    return {
      ...row,
      budid: hit.id ?? null,
      amountHTEur: hit.amountHTEur ?? 0,

      // si la vue contient des labels plus fiables
      cccode: row.cccode ?? hit.centrecoutCode ?? null,
      // cclibelle si tu l’as dans BudgetView (recommandé)
    };
  });
}