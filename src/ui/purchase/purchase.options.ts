

import type { SelectOption } from "@/ui/_shared/select-options";
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read"; // ajuste le chemin si besoin

export type PurchaseEditorOptions = {
	societes: SelectOption[];
	exercices: SelectOption[];
	centresCout: SelectOption[];
};

type SocieteLike = { soc_id: string | null; soc_nom: string | null };
type ExerciceLike = { exer_id: string | null; exer_code: string | null };
type CentreCoutLike = { cc_id: string | null; cc_code: string | null; cc_libelle: string | null };

export function toSocieteOptions(rows: SocieteLike[]): SelectOption[] {
	return rows
		.filter((r): r is SocieteLike & { soc_id: string } => r.soc_id != null)
		.map((r) => ({
			value: r.soc_id,
			label: r.soc_nom ?? "(sans nom)",
		}));
}

export function toExerciceOptions(rows: ExerciceLike[]): SelectOption[] {
	return rows
		.filter((r): r is ExerciceLike & { exer_id: string } => r.exer_id != null)
		.map((r) => ({
			value: r.exer_id,
			label: r.exer_code ?? "(sans code)",
		}));
}

export function toCentreCoutOptions(rows: CentreCoutLike[]): SelectOption[] {
	return rows
		.filter((r): r is CentreCoutLike & { cc_id: string } => r.cc_id != null)
		.map((r) => ({
			value: r.cc_id,
			label: `${r.cc_code ?? ""} ${r.cc_libelle ?? ""}`.trim() || "(centre de coût)",
		}));
}

export async function getPurchaseEditorOptions(
	cltId: string
): Promise<PurchaseEditorOptions> {

	//console.log("getPurchaseEditorOptions, Entrée cltId", cltId)


	const supabase = await createSupabaseServerReadClient();

	const [socRes, exerRes, ccRes] = await Promise.all([
		supabase
			.from("vw_societe_view")
			.select("soc_id,soc_nom,clt_id")
			.eq("clt_id", cltId),

		supabase
			.from("vw_exercice_view")
			.select("exer_id,exer_code,clt_id")
			.eq("clt_id", cltId),

		supabase
			.from("vw_centre_cout_view")
			.select("cc_id,cc_code,cc_libelle,clt_id")
			.eq("clt_id", cltId),
	]);
	//console.log("getPurchaseEditorOptions, socRes.error.message", socRes.error?.message)
	//console.log("getPurchaseEditorOptions, exerRes.error.message", exerRes.error?.message)
	//console.log("getPurchaseEditorOptions, ccRes.error.message", ccRes.error?.message)

	if (socRes.error) throw new Error(`Options societes: ${socRes.error.message}`);
	if (exerRes.error) throw new Error(`Options exercices: ${exerRes.error.message}`);
	if (ccRes.error) throw new Error(`Options centresCout: ${ccRes.error.message}`);

	/* console.log("getPurchaseEditorOptions cltId", cltId, {
	 societesCount: socRes.data?.length ?? 0,
	 societesRaw: socRes.data ?? [],
	 exercicesCount: exerRes.data?.length ?? 0,
	 centresCoutCount: ccRes.data?.length ?? 0,
   });*/

	//const societes = toSocieteOptions(socRes.data ?? []);
	//console.log("societes mapped -->", societes);

	return {
		societes: toSocieteOptions(socRes.data ?? []),
		exercices: toExerciceOptions(exerRes.data ?? []),
		centresCout: toCentreCoutOptions(ccRes.data ?? []),
	};
}