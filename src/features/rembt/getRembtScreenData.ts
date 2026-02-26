

import { getCurrentClient } from "@/domain/session/current-client";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";


const VW_EXER = "vw_exercice_view";
const VW_INVP = "vw_invoice_purchase_view";
const VW_REMBT = "vw_remboursement_view";

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

type ExerciseOption = { exer_id: string; exer_code: string | null };

export async function getRembtScreenData(params: { exerid?: string }): Promise<RembtScreenData> {

	const clientCtx = await getCurrentClient();

	const cltId = clientCtx.current?.cltId ?? null;
	if (!cltId) {
		// selon vos conventions : soit throw, soit écran vide
		throw new Error("Aucun client courant (getCurrentClient.current.cltId est null)");
	}

	const supabase = createSupabaseAdminClient();

	// 1) Options exercice (tous)
	const { data: exerRows, error: exerErr } = await supabase
		.from(VW_EXER)
		.select("exer_id, exer_code, exer_actif, exer_debut")
		.eq("clt_id", cltId)
		.order("exer_debut", { ascending: false });

	if (exerErr) throw new Error(exerErr.message);

	const exerciseOptions: ExerciseOption[] = (exerRows ?? [])
		.filter((r) => !!r.exer_id) // car exerc_id est nullable dans Database types
		.map((r) => ({
			exer_id: r.exer_id as string,
			exer_code: r.exer_code ?? null,
		}));

	// 2) Exercice sélectionné : querystring sinon actif sinon premier
	const active = (exerRows ?? []).find((r) => r.exer_actif && r.exer_id);
	const resolvedExerId =
		params.exerid ??
		(active?.exer_id as string | undefined) ??
		(exerciseOptions[0]?.exer_id as string | undefined);

if (!resolvedExerId) {
  return {
    exerid: "",
    exerciseOptions,
    state: {
      toRefundAmount: 0,
      refundedAmount: 0,
      remainingAmount: 0,
      exerCode: null,
    },
    rows: [] as RembtRow[],
  };
}

	// 3) Montant à rembourser : somme invp_paid_by_third_party_amount
	const { data: invpRows, error: invpErr } = await supabase
		.from(VW_INVP)
		.select("invp_paid_by_third_party_amount, exer_code")
		.eq("clt_id", cltId)
		.eq("exer_id", resolvedExerId);

	if (invpErr) throw new Error(invpErr.message);

	const toRefundAmount = (invpRows ?? []).reduce(
		(acc, r) => acc + Number(r.invp_paid_by_third_party_amount ?? 0),
		0
	);

	// 4) Remboursements (liste + total)
	const { data: rembRows, error: rembErr } = await supabase
		.from(VW_REMBT)
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
		(invpRows?.[0]?.exer_code ?? rembRows?.[0]?.exer_code ?? null) as string | null;

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