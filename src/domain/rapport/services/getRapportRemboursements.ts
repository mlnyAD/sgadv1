

// src/domain/rapport/services/getRapportRemboursements.ts

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { DB } from "@/domain/_db/names";
import type { RapportRemboursementsData } from "../types";

export async function getRapportRemboursements(params: {
  cltId: string;
  exerId: string;
}): Promise<RapportRemboursementsData | null> {
  const supabase = await createSupabaseServerReadClient();

  const { data: purRows, error: purErr } = await supabase
    .from(DB.views.Purchase)
    .select("pur_paid_by_third_party_amount")
    .eq("clt_id", params.cltId)
    .eq("exer_id", params.exerId);

  if (purErr) throw new Error(purErr.message);

  const { data: rembRows, error: rembErr } = await supabase
    .from(DB.views.remboursement)
    .select("rbt_amount")
    .eq("clt_id", params.cltId)
    .eq("exer_id", params.exerId);

  if (rembErr) throw new Error(rembErr.message);

  const toRefundAmount = (purRows ?? []).reduce(
    (acc, row) => acc + Number(row.pur_paid_by_third_party_amount ?? 0),
    0,
  );

  const refundedAmount = (rembRows ?? []).reduce(
    (acc, row) => acc + Number(row.rbt_amount ?? 0),
    0,
  );

  return {
    toRefundAmount: Math.round(toRefundAmount),
    refundedAmount: Math.round(refundedAmount),
    remainingAmount: Math.round(toRefundAmount - refundedAmount),
  };
}