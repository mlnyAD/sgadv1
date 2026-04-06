

import type { SelectOption } from "@/ui/_shared/select-options";
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read"; // ajuste le chemin si besoin

export type InvoiceEditorOptions = {
	societes: SelectOption[];
	exercices: SelectOption[];
};

type SocieteLike = { soc_id: string | null; soc_nom: string | null };
type ExerciceLike = { exer_id: string | null; exer_code: string | null };

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

export async function getSalesEditorOptions(
	cltId: string
): Promise<InvoiceEditorOptions> {

	//console.log("getSalesEditorOptions, Entrée cltId", cltId)


	const supabase = await createSupabaseServerReadClient();

	const [socRes, exerRes, ] = await Promise.all([
		supabase
			.from("vw_societe_view")
			.select("soc_id,soc_nom,clt_id")
			.eq("clt_id", cltId),

		supabase
			.from("vw_exercice_view")
			.select("exer_id,exer_code,clt_id")
			.eq("clt_id", cltId),

	]);
	//console.log("getSalesEditorOptions, socRes.error.message", socRes.error?.message)
	//console.log("getSalesEditorOptions, exerRes.error.message", exerRes.error?.message)

	if (socRes.error) throw new Error(`Options societes: ${socRes.error.message}`);
	if (exerRes.error) throw new Error(`Options exercices: ${exerRes.error.message}`);

	/* console.log("getSalesEditorOptions cltId", cltId, {
	 societesCount: socRes.data?.length ?? 0,
	 societesRaw: socRes.data ?? [],
	 exercicesCount: exerRes.data?.length ?? 0,
   });*/

	//const societes = toSocieteOptions(socRes.data ?? []);
	//console.log("societes mapped -->", societes);

	return {
		societes: toSocieteOptions(socRes.data ?? []),
		exercices: toExerciceOptions(exerRes.data ?? []),
	};
}