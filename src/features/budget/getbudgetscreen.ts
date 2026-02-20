

"use server";

import { getCurrentClient } from "@/domain/session/current-client";
import {
	listBudgetExerciseOptions,
	listBudgetLines,
	listBudgetSalesLines,
	listBudgetPurchaseLines,
} from "@/domain/budget/budget-repository";
import { listCentresCout } from "@/domain/centre-cout/centre-cout-repository";

import { buildBudgetSkeleton, mergeExistingIntoSkeleton } from "./budget-skeleton";
import type { BudgetDraftRow } from "./budget.types";

import { getRevenueTypeById, toRevenueTypeId } from "@/domain/invoice/invoice-types.catalog";
import { getFamilleById, toCentreCoutFamilleId } from "@/domain/centre-cout/centre-cout-familles.catalog";
import { REVENUE_TYPES, type RevenueTypeId } from "@/domain/invoice/invoice-types.catalog";


export type BudgetExerciseOption = { exer_id: string; exer_code: string | null };

export type SalesRow = {
  budid: string | null;
  revenue_type_id: number; // 1/2/3 (catalogue)
  detail: string;
  budget_ht_eur: number;
  realized_ht_eur: number;
};

export type PurchaseRow = {
  budid: string | null;
  cc_id: string;            // cc_id de vw_centre_cout_view
  famille: string;
  cc_code: string;
  cc_libelle: string;
  budget_ht_eur: number;
  realized_ht_eur: number;
};

export type BudgetScreenData = {
	cltId: string;
	exerid: string;
	exerciseOptions: BudgetExerciseOption[];

	// ✅ squelette éditable (pour plus tard)
	rows: BudgetDraftRow[];

	// ✅ affichage avancement
	salesRows: SalesRow[];
	purchaseRows: PurchaseRow[];
};

export async function getBudgetScreenData(params: {
	exerid?: string;
}): Promise<BudgetScreenData> {
	const { current } = await getCurrentClient();
	if (!current?.cltId) throw new Error("Aucun client sélectionné");

	const exerciseOptions = await listBudgetExerciseOptions({
		cltId: current.cltId,
		actifOnly: false,
	});

	const defaultExerid = exerciseOptions[0]?.exer_id;
	const exerid = params.exerid ?? defaultExerid;
	if (!exerid) throw new Error("Aucun exercice disponible");

	// --- squelette
	const centresCout = await listCentresCout({ cltId: current.cltId, actifOnly: true });
	const existing = await listBudgetLines({ cltId: current.cltId, exerid });

	// existing vient de vw_budget_view -> BudgetView (kind est number 1/2)
const existingMapSales = new Map<number, { budid: string; amount: number }>();
const existingMapPurch = new Map<string, { budid: string; amount: number }>();

for (const e of existing) {
  if (e.kind === 1) {
    if (e.revenueTypeId != null) {
      existingMapSales.set(Number(e.revenueTypeId), { budid: e.id, amount: e.amountHTEur ?? 0 });
    }
  } else if (e.kind === 2) {
    if (e.centrecoutId) {
      existingMapPurch.set(e.centrecoutId, { budid: e.id, amount: e.amountHTEur ?? 0 });
    }
  }
}
	
	const skeleton = buildBudgetSkeleton({ exerid, centresCout });
	const rows = mergeExistingIntoSkeleton({ skeleton, existing });

	// --- réalisé (vues)
	const salesLines = await listBudgetSalesLines({ cltId: current.cltId, exerid });
	const purchaseLines = await listBudgetPurchaseLines({ cltId: current.cltId, exerid });

	// 1) squelette CA: toujours les 3 lignes (---/Trvx/Autre)
const salesSkeleton: SalesRow[] = REVENUE_TYPES.map((rt) => {
  const hit = existingMapSales.get(rt.id);
  return {
    budid: hit?.budid ?? null,
    revenue_type_id: rt.id,
    detail: rt.libelle,
    budget_ht_eur: hit?.amount ?? 0, // ✅ budget éditable = table budget si déjà créé
    realized_ht_eur: 0,
  };
});

	// 2) index des valeurs réelles par RevenueType
	const salesMap = new Map<string, { budget: number; realized: number }>();
	for (const l of salesLines ?? []) {
		const rtId: RevenueTypeId | null =
			l.revenue_type_id != null ? toRevenueTypeId(Number(l.revenue_type_id)) : null;

		const label = rtId ? (getRevenueTypeById(rtId)?.libelle ?? String(rtId)) : "---";
		salesMap.set(label, {
			budget: l.budget_ht_eur ?? 0,
			realized: l.realized_ht_eur ?? 0,
		});
	}

	// 3) merge: squelette + valeurs
	const salesRows: SalesRow[] = salesSkeleton.map((r) => {
		const hit = salesMap.get(r.detail);
		return hit ? { ...r, realized_ht_eur: hit.realized } : r;
	});

const purchaseSkeleton: PurchaseRow[] = centresCout
  .filter((cc) => !!cc.cc_id)
  .map((cc) => {
    const famId = toCentreCoutFamilleId(cc.famille_id ?? 8);
    const hit = existingMapPurch.get(cc.cc_id!);

    return {
      budid: hit?.budid ?? null,
      cc_id: cc.cc_id!,
      famille: getFamilleById(famId)?.libelle ?? "Autres",
      cc_code: cc.cc_code ?? "-",
      cc_libelle: cc.cc_libelle ?? "-",
      budget_ht_eur: hit?.amount ?? 0, // ✅ budget éditable
      realized_ht_eur: 0,
    };
  });

	// index valeurs réelles par (famille + cc_code)
	const purchMap = new Map<string, { budget: number; realized: number }>();
	for (const l of purchaseLines ?? []) {
		const famId = toCentreCoutFamilleId(l.famille_id ?? 8);
		const fam = getFamilleById(famId)?.libelle ?? "Autres";
		const key = `${fam}||${l.cc_code ?? "-"}`;
		purchMap.set(key, {
			budget: l.budget_ht_eur ?? 0,
			realized: l.realized_ht_eur ?? 0,
		});
	}

	const purchaseRows: PurchaseRow[] = purchaseSkeleton.map((r) => {
		const key = `${r.famille}||${r.cc_code}`;
		const hit = purchMap.get(key);
		return hit ? { ...r, realized_ht_eur: hit.realized } : r;
	});

	return {
		cltId: current.cltId,
		exerid,
		exerciseOptions,
		rows,
		salesRows,
		purchaseRows,
	};
}
