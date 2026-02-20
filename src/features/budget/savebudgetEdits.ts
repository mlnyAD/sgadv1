

"use server";

import { createBudgetLine, updateBudgetLine } from "@/domain/budget/budget-repository";
import type { SalesRow, PurchaseRow } from "./getbudgetscreen";
import { toBudgetKindDb } from "@/domain/budget/budget-kind";


export async function saveBudgetEdits(params: {
  exerid: string;
  salesRows: SalesRow[];
  purchaseRows: PurchaseRow[];
}): Promise<void> {
  const { exerid, salesRows, purchaseRows } = params;

  // VENTES: bud_kind = "1"
  for (const r of salesRows) {
    const amount = Number(r.budget_ht_eur ?? 0);
    if (r.budid) {
      await updateBudgetLine(r.budid, { bud_amount_ht_eur: amount });
    } else {

      console.log("CREATE SALES", { bud_kind: "SALES", revenue_type_id: r.revenue_type_id, amount });

      await createBudgetLine({
        exer_id: exerid,
        bud_kind: toBudgetKindDb(1),
        revenue_type_id: r.revenue_type_id,
        bud_amount_ht_eur: amount,
      });
    }
  }

  // ACHATS: bud_kind = "2"
  for (const r of purchaseRows) {
    const amount = Number(r.budget_ht_eur ?? 0);
    if (r.budid) {
      await updateBudgetLine(r.budid, { bud_amount_ht_eur: amount });
    } else {


console.log("CREATE PURCH", { bud_kind: "PURCHASE", cc_id: r.cc_id, amount });
      await createBudgetLine({
        exer_id: exerid,
        bud_kind: toBudgetKindDb(1),
        cc_id: r.cc_id,
        bud_amount_ht_eur: amount,
      });
    }
  }
}