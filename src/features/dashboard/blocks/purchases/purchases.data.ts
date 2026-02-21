

// src/features/dashboard/blocks/purchases/purchases.data.ts

import type { SupabaseClient } from "@supabase/supabase-js";
import {
  CENTRE_COUT_FAMILLES,
  toCentreCoutFamilleId,
} from "@/domain/centre-cout/centre-cout-familles.catalog";

type CentreCoutRow = {
  cc_id: string | null;
  famille_id: number | null;
};

type InvoiceRow = {
  cc_id: string | null;
  inv_amount_ht: number | null;
};

type BudgetRow = {
  famille_id: number | null;
  budget_ht_eur: number | null;
};

export async function loadPurchasesBlock(
  supabase: SupabaseClient,
  exerId: string
) {
  // 1️⃣ Mapping centre → famille
  const { data: ccRows, error: ccErr } = await supabase
    .from("vw_centre_cout_view")
    .select("cc_id, famille_id");

  if (ccErr) throw ccErr;

  const ccToFamille = new Map<string, number>();

  for (const r of (ccRows ?? []) as CentreCoutRow[]) {
    if (r.cc_id) {
      ccToFamille.set(r.cc_id, r.famille_id ?? 8);
    }
  }

  // 2️⃣ Réalisé achats
  const { data: invRows, error: invErr } = await supabase
    .from("vw_invoice_purchase_view")
    .select("cc_id, inv_amount_ht")
    .eq("exer_id", exerId);

  if (invErr) throw invErr;

  const realizedByFamille = new Map<number, number>();
  let totalRealized = 0;

  for (const r of (invRows ?? []) as InvoiceRow[]) {
    const famId = toCentreCoutFamilleId(
      ccToFamille.get(r.cc_id ?? "") ?? 8
    );

    const amount = r.inv_amount_ht ?? 0;
    totalRealized += amount;

    realizedByFamille.set(
      famId,
      (realizedByFamille.get(famId) ?? 0) + amount
    );
  }

  // 3️⃣ Budget achats
  const { data: budRows, error: budErr } = await supabase
    .from("vw_budget_purchase_lines")
    .select("famille_id, budget_ht_eur")
    .eq("exer_id", exerId);

  if (budErr) throw budErr;

  const budgetByFamille = new Map<number, number>();
  let totalBudget = 0;

  for (const r of (budRows ?? []) as BudgetRow[]) {
    const famId = toCentreCoutFamilleId(r.famille_id ?? 8);
    const amount = r.budget_ht_eur ?? 0;

    totalBudget += amount;
    budgetByFamille.set(
      famId,
      (budgetByFamille.get(famId) ?? 0) + amount
    );
  }

  // 4️⃣ Construction dataset graphique (ordre catalogue)
  const byFamille = CENTRE_COUT_FAMILLES.map((f) => ({
    label: f.libelle,
    budgetEur: Math.round(budgetByFamille.get(f.id) ?? 0),
    realizedEur: Math.round(realizedByFamille.get(f.id) ?? 0),
  }));

  return {
    totalBudgetEur: Math.round(totalBudget),
    totalRealizedEur: Math.round(totalRealized),
    byCentreCout: byFamille, // on conserve la clé pour éviter refacto UI
  };
}