

import type { SelectOption } from "@/ui/_shared/select-options";
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read"; // ajuste le chemin si besoin

export type InvoiceEditorOptions = {
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

export async function getInvoiceEditorOptions(cltId: string): Promise<InvoiceEditorOptions> {

	const supabase = await createSupabaseServerReadClient();

const [socRes, exerRes, ccRes] = await Promise.all([
    supabase.from("societe").select("soc_id,soc_nom").eq("clt_id", cltId),
    supabase.from("exercice").select("exer_id,exer_code").eq("clt_id", cltId),
    supabase.from("centre_cout").select("cc_id,cc_code,cc_libelle").eq("clt_id", cltId),
  ]);

  if (socRes.error) throw new Error(`Options societes: ${socRes.error.message}`);
  if (exerRes.error) throw new Error(`Options exercices: ${exerRes.error.message}`);
  if (ccRes.error) throw new Error(`Options centresCout: ${ccRes.error.message}`);

  // debug temporaire
  console.log("getInvoiceEditorOptions cltId", cltId, {
    societes: socRes.data?.length ?? 0,
    exercices: exerRes.data?.length ?? 0,
    centresCout: ccRes.data?.length ?? 0,
  });

  return {
    societes: toSocieteOptions(socRes.data ?? []),
    exercices: toExerciceOptions(exerRes.data ?? []),
    centresCout: toCentreCoutOptions(ccRes.data ?? []),
  };
}