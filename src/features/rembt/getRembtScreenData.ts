

import { getCurrentClient } from "@/domain/session/current-client";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { DB } from "@/domain/_db/names";

type ExerciseOption = { exer_id: string; exer_code: string | null };

type RembtRow = {
  rbt_id: string;
  rbt_date: string;
  rbt_amount: number;
  rbt_commentaires: string;
};

type RembtScreenData = {
  exerid: string;
  exerciseOptions: ExerciseOption[];
  state: {
    toRefundAmount: number;
    refundedAmount: number;
    remainingAmount: number;
    exerCode: string | null;
  };
  rows: RembtRow[];
};

export async function getRembtScreenData(params: { exerid?: string }): Promise<RembtScreenData> {
  const { current } = await getCurrentClient({ requireSelected: true, next: "/rembt" })
  if (!current?.cltId) throw new Error("Aucun client courant");
  const cltId = current.cltId;

  const supabase = createSupabaseAdminClient();

  const { data: exerRows, error: exerErr } = await supabase
    .from(DB.views.exercice)
    .select("exer_id, exer_code, exer_actif, exer_debut")
    .eq("clt_id", cltId)
    .order("exer_debut", { ascending: false });

  if (exerErr) throw new Error(exerErr.message);

  const exerciseOptions: ExerciseOption[] = (exerRows ?? [])
    .filter((r) => !!r.exer_id)
    .map((r) => ({ exer_id: r.exer_id as string, exer_code: r.exer_code ?? null }));

  const active = (exerRows ?? []).find((r) => r.exer_actif && r.exer_id);
  const resolvedExerId =
    params.exerid ??
    (active?.exer_id as string | undefined) ??
    (exerciseOptions[0]?.exer_id as string | undefined);

  if (!resolvedExerId) {
    return {
      exerid: "",
      exerciseOptions,
      state: { toRefundAmount: 0, refundedAmount: 0, remainingAmount: 0, exerCode: null },
      rows: [],
    };
  }

  const { data: purRows, error: purErr } = await supabase
    .from(DB.views.Purchase)
    .select("pur_paid_by_third_party_amount, exer_code")
    .eq("clt_id", cltId)
    .eq("exer_id", resolvedExerId);

  if (purErr) throw new Error(purErr.message);

  const toRefundAmount = (purRows ?? []).reduce(
    (acc, r) => acc + Number(r.pur_paid_by_third_party_amount ?? 0),
    0
  );

  const { data: rembRows, error: rembErr } = await supabase
    .from(DB.views.remboursement)
    .select("rbt_id, rbt_date, rbt_amount, rbt_commentaires, exer_code, lmod")
    .eq("clt_id", cltId)
    .eq("exer_id", resolvedExerId)
    .order("rbt_date", { ascending: false })
    .order("lmod", { ascending: false });

  if (rembErr) throw new Error(rembErr.message);

  const refundedAmount = (rembRows ?? []).reduce(
    (acc, r) => acc + Number(r.rbt_amount ?? 0),
    0
  );

  const exerCode =
    (purRows?.[0]?.exer_code ?? rembRows?.[0]?.exer_code ?? null) as string | null;

  const rows: RembtRow[] = (rembRows ?? [])
    .filter((r) => !!r.rbt_id && !!r.rbt_date)
    .map((r) => ({
      rbt_id: r.rbt_id as string,
      rbt_date: r.rbt_date as string,
      rbt_amount: Number(r.rbt_amount ?? 0),
      rbt_commentaires: String(r.rbt_commentaires ?? ""),
    }));

  return {
    exerid: resolvedExerId,
    exerciseOptions,
    state: {
      toRefundAmount,
      refundedAmount,
      remainingAmount: toRefundAmount - refundedAmount,
      exerCode,
    },
    rows,
  };
}