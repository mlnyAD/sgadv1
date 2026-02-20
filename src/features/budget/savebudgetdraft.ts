

// src/features/budget/savebudgetdraft.ts
"use server";

import type { BudgetDraftRow } from "./budget.types";
import { createBudgetLine, updateBudgetLine } from "@/domain/budget/budget-repository";

export async function saveBudgetDraft(params: { rows: BudgetDraftRow[] }) {
  const { rows } = params;

  // Validation globale (exemples)
  if (rows.some((r) => Number.isNaN(r.amountHTEur))) throw new Error("Montant invalide");
  if (rows.some((r) => r.amountHTEur < 0)) throw new Error("Montants négatifs interdits");

  // Create: lignes sans budid et montant != 0
  const toCreate = rows.filter((r) => !r.budid && r.amountHTEur !== 0);

  // Update: lignes avec budid (on autorise 0)
  const toUpdate = rows.filter((r) => !!r.budid);

  // Inserts
  for (const r of toCreate) {
    await createBudgetLine({
      exer_id: r.exerid,
      bud_kind: String(r.kind), // si la colonne est text en DB
      bud_amount_ht_eur: r.amountHTEur,
      cc_id: r.kind === 2 ? r.ccid : null,
      revenue_type_id: r.kind === 1 ? r.revenuetypeid : null,
      oper_id: null,
    });
  }

  // Updates
  for (const r of toUpdate) {
    await updateBudgetLine(r.budid!, {
      bud_amount_ht_eur: r.amountHTEur,
    });
  }
}