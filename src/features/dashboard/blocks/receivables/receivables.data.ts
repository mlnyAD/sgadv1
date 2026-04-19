

import type { SupabaseClient } from "@supabase/supabase-js";
import type { DashboardReceivables } from "@/features/dashboard/dashboard.types";

type SalesRow = {
  sal_amount_ht: number | null;
  sal_due_date: string | null;
  sal_bank_value_date: string | null;
};

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

export async function loadReceivablesBlock(
  supabase: SupabaseClient,
  cltId: string,
  exerId: string
): Promise<DashboardReceivables> {
  const { data, error } = await supabase
    .from("vw_sales_view")
    .select("sal_amount_ht, sal_due_date, sal_bank_value_date")
    .eq("clt_id", cltId)
    .eq("exer_id", exerId);

  if (error) throw error;

  const rows = (data ?? []) as SalesRow[];
  const today = todayIsoDate();

  let emittedHt = 0;
  let paid = 0;
  let dueNotLate = 0;
  let dueLate = 0;

  for (const r of rows) {
    const amount = r.sal_amount_ht ?? 0;
    emittedHt += amount;

    const isPaid = !!r.sal_bank_value_date;
    if (isPaid) {
      paid += amount;
      continue;
    }

    const due = r.sal_due_date;
    if (!due || due >= today) dueNotLate += amount;
    else dueLate += amount;
  }

  return {
    emittedHt: Math.round(emittedHt),
    paid: Math.round(paid),
    dueNotLate: Math.round(dueNotLate),
    dueLate: Math.round(dueLate),
  };
}