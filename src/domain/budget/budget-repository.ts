

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { SELECT_BUDGET_VIEW } from "./budget.select";
import { mapBudgetViewRowToView, type VwBudgetViewRow } from "@/domain/budget/budget-mapper";
import type { BudgetView } from "@/domain/budget/budget-types";
import type { BudgetInsert, BudgetUpdate } from "@/domain/_db/rows";
import { getCurrentClient } from "@/domain/session/current-client";

export type BudgetSalesLineRow = {
  revenue_type_id: number | null;
  budget_ht_eur: number | null;
  realized_ht_eur: number | null;
  pct_realise: number | null;
  clt_id: string | null;
  exer_id: string | null;
};

/**
 * Récupère UNE ligne budget (table budget) identifiée par bud_id, via la vue.
 * Utile si tu as un écran / modal d'édition d'une ligne.
 */
export async function getBudgetLineByBudId(params: {
  cltId: string;
  budid: string;
}): Promise<BudgetView | null> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_budget_view")
    .select(SELECT_BUDGET_VIEW)
    .eq("bud_id", params.budid)
    .eq("clt_id", params.cltId)
    .maybeSingle();

  if (error || !data) return null;

  return mapBudgetViewRowToView(data as unknown as VwBudgetViewRow);
}

export async function createBudgetLine(payload: Omit<BudgetInsert, "clt_id">): Promise<void> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseAdminClient();
  const { error } = await supabase.from("budget").insert({ ...payload, clt_id: current.cltId });
  if (error) throw new Error(error.message);
}


export async function updateBudgetLine(budid: string, payload: BudgetUpdate): Promise<void> {
  const { current } = await getCurrentClient();
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const supabase = await createSupabaseAdminClient();
  const { error } = await supabase
    .from("budget")
    .update(payload)
    .eq("bud_id", budid)
    .eq("clt_id", current.cltId);

  if (error) throw new Error(error.message);
}


/**
 * Options d'exercices pour le select.
 * Idéalement: une vue dédiée. Ici on fait simple en dédupliquant côté serveur.
 */
export type BudgetExerciseOption = {
  exer_id: string;
  exer_code: string | null;
  exer_actif?: boolean | null;
};

export async function listBudgetExerciseOptions(params: {
  cltId: string;
  actifOnly?: boolean;
}): Promise<BudgetExerciseOption[]> {
  const supabase = await createSupabaseServerReadClient();

  // Si tu veux filtrer sur actif, il faut sélectionner exer_actif aussi
  // Sinon, enlève le filtre.
  let q = supabase
    .from("vw_exercice_view")
    .select("exer_id,exer_code,exer_actif") // ✅ on l'ajoute puisque tu filtres dessus
    .eq("clt_id", params.cltId)
    .order("exer_code", { ascending: false });

  if (params.actifOnly) q = q.eq("exer_actif", true);

  const { data, error } = await q;
  if (error) throw new Error(error.message);

  const rows = (data ?? []) as unknown as Array<{
    exer_id: string | null;
    exer_code: string | null;
    exer_actif: boolean | null;
  }>;

  const map = new Map<string, BudgetExerciseOption>();
  for (const r of rows) {
    if (!r.exer_id) continue;
    if (!map.has(r.exer_id)) {
      map.set(r.exer_id, { exer_id: r.exer_id, exer_code: r.exer_code });
    }
  }

  return Array.from(map.values());
}

export async function listBudgetLines(params: {
  cltId: string;
  exerid: string;
}): Promise<BudgetView[]> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_budget_view")
    .select(SELECT_BUDGET_VIEW)
    .eq("clt_id", params.cltId)
    .eq("exer_id", params.exerid)
    .not("bud_id", "is", null) // garantit éditable
    .order("bud_kind", { ascending: true });

  if (error) throw new Error(error.message);

 return (data ?? []).map((r) =>
  mapBudgetViewRowToView(r as unknown as VwBudgetViewRow)
);
}

export async function listBudgetSalesLines(params: { cltId: string; exerid: string }) {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_budget_sales_lines")
    .select("revenue_type_id,budget_ht_eur,realized_ht_eur,pct_realise,clt_id,exer_id")
    .eq("clt_id", params.cltId)
    .eq("exer_id", params.exerid)
    .order("revenue_type_id", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []) as unknown as BudgetSalesLineRow[];
}

export type BudgetPurchaseLineRow = {
  cc_id: string | null;
  cc_code: string | null;
  cc_libelle: string | null;
  famille_id: number | null;
  budget_ht_eur: number | null;
  realized_ht_eur: number | null;
  pct_realise: number | null;
  clt_id: string | null;
  exer_id: string | null;
};

export async function listBudgetPurchaseLines(params: { cltId: string; exerid: string }) {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_budget_purchase_lines")
    .select("cc_id,cc_code,cc_libelle,famille_id,budget_ht_eur,realized_ht_eur,pct_realise,clt_id,exer_id")
    .eq("clt_id", params.cltId)
    .eq("exer_id", params.exerid)
    .order("famille_id", { ascending: true })
    .order("cc_code", { ascending: true });

  if (error) throw new Error(error.message);

  console.log("listBudgetPurchaseLines data, error ", data, error)

  return (data ?? []) as unknown as BudgetPurchaseLineRow[];
}