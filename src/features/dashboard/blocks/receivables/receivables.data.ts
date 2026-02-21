

import type { SupabaseClient } from "@supabase/supabase-js";
import type { DashboardReceivables } from "@/features/dashboard/dashboard.types";

type InvoiceSalesRow = {
  inv_amount_ht: number | null;
  inv_due_date: string | null;      // ISO date string
  inv_payment_date: string | null;  // ISO date string
};

function todayIsoDate() {
  // suffisant ici : comparaison lexicographique OK si format YYYY-MM-DD
  return new Date().toISOString().slice(0, 10);
}

export async function loadReceivablesBlock(
  supabase: SupabaseClient,
  exerId: string
): Promise<DashboardReceivables> {
  const { data, error } = await supabase
    .from("vw_invoice_sales_view")
    .select("inv_amount_ht, inv_due_date, inv_payment_date")
    .eq("exer_id", exerId);

  if (error) throw error;

  const rows = (data ?? []) as InvoiceSalesRow[];
  const today = todayIsoDate();

  let emittedHt = 0;
  let paid = 0;
  let dueNotLate = 0;
  let dueLate = 0;

  for (const r of rows) {
    const amount = r.inv_amount_ht ?? 0;
    emittedHt += amount;

    const isPaid = !!r.inv_payment_date;
    if (isPaid) {
      paid += amount;
      continue;
    }

    // unpaid
    const due = r.inv_due_date; // may be null
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