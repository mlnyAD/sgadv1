

import { createSupabaseServerWriteClient } from "@/lib/supabase/server-write";
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { mapRemboursementViewRow } from "./rembt.mapper";
import type { RefundState, RemboursementRow } from "./rembt.types";

const VW_REMBT = "vw_remboursement_view";
const VW_PURCHASE = "vw_purchase_view";
const TBL_REMBT = "remboursement";

type PurchaseRefundRow = {
  pur_paid_by_third_party_amount: number | string | null;
  exer_code: string | null;
};

type RemboursementAggRow = {
  rbt_amount: number | string | null;
  exer_code: string | null;
};

export async function getRefundState(params: {
  cltId: string;
  exerId: string;
}): Promise<RefundState> {
  const supabase = await createSupabaseServerReadClient();

  const [
    { data: invpRows, error: invpErr },
    { data: rembAgg, error: rembAggErr },
  ] = await Promise.all([
    supabase
      .from(VW_PURCHASE)
      .select("pur_paid_by_third_party_amount, exer_code")
      .eq("clt_id", params.cltId)
      .eq("exer_id", params.exerId),
    supabase
      .from(VW_REMBT)
      .select("rbt_amount, exer_code")
      .eq("clt_id", params.cltId)
      .eq("exer_id", params.exerId),
  ]);

  if (invpErr) throw new Error(invpErr.message);
  if (rembAggErr) throw new Error(rembAggErr.message);

  const purchaseRows = (invpRows ?? []) as PurchaseRefundRow[];
  const remboursementRows = (rembAgg ?? []) as RemboursementAggRow[];

  const toRefundAmount = purchaseRows.reduce(
    (acc, row) => acc + Number(row.pur_paid_by_third_party_amount ?? 0),
    0
  );

  const refundedAmount = remboursementRows.reduce(
    (acc, row) => acc + Number(row.rbt_amount ?? 0),
    0
  );

  const exerCode =
    purchaseRows[0]?.exer_code ?? remboursementRows[0]?.exer_code ?? null;

  return {
    cltId: params.cltId,
    exerId: params.exerId,
    exerCode,
    toRefundAmount,
    refundedAmount,
    remainingAmount: toRefundAmount - refundedAmount,
  };
}

export async function listRemboursements(params: {
  cltId: string;
  exerId: string;
}): Promise<RemboursementRow[]> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from(VW_REMBT)
    .select("*")
    .eq("clt_id", params.cltId)
    .eq("exer_id", params.exerId)
    .order("rbt_date", { ascending: false })
    .order("lmod", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapRemboursementViewRow);
}

export async function createRemboursement(params: {
  cltId: string;
  exerId: string;
  amount: number;
  date: string;
}) {
  const supabase = await createSupabaseServerWriteClient();

  const { error } = await supabase.from(TBL_REMBT).insert({
    rbt_clt_id: params.cltId,
    rbt_exer_id: params.exerId,
    rbt_amount: params.amount,
    rbt_date: params.date,
  });

  if (error) throw new Error(error.message);
}

export async function deleteRemboursement(params: {
  rbtId: string;
  cltId: string;
  exerId: string;
}) {
  const supabase = await createSupabaseServerWriteClient();

  const { error } = await supabase
    .from(TBL_REMBT)
    .delete()
    .eq("rbt_id", params.rbtId)
    .eq("rbt_clt_id", params.cltId)
    .eq("rbt_exer_id", params.exerId);

  if (error) throw new Error(error.message);
}