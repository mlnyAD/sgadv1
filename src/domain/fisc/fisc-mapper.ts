

// src/domain/fisc/fisc-mapper.ts
import type { FiscRow, FiscInsert, FiscUpdate } from "@/domain/_db/rows";
import type { FiscView } from "./fisc-types";
import type { FiscFormValues } from "@/ui/fisc/fisc-form.types";
import { reqStr, reqNum } from "@/helpers/row-guards";

export function mapFiscRowToView(row: FiscRow): FiscView {
  return {
    id: reqStr(row.fisc_id, "fisc_id", "vw_fisc_view"),

    clientId: reqStr(row.fisc_clt_id, "fisc_clt_id", "vw_fisc_view"),
    clientNom: row.clt_nom ?? null,

    societeId: row.fisc_soc_id ?? null,
    societeNom: row.soc_nom ?? null,

    exerciceId: reqStr(row.fisc_exer_id, "fisc_exer_id", "vw_fisc_view"),
    exerciceCode: row.exer_code ?? null,

    typeId: reqNum(row.fisc_type_id, "fisc_type_id", "vw_fisc_view"),
    montant: reqNum(row.fisc_montant as unknown as number | null, "fisc_montant", "vw_fisc_view"),

    date: row.fisc_date ?? null,
    commentaires: row.fisc_comments ?? null,
    lmod: (row.fisc_lmod as unknown as string | null) ?? "",
  };
}

// (tes autres mappers)
export function mapFiscFormToInsert(form: FiscFormValues): Omit<FiscInsert, "fisc_clt_id"> {
  return {
    fisc_soc_id: null, // ou form.societeId si tu la gardes encore
    fisc_exer_id: form.exerciceId,
    fisc_type_id: form.typeId,
    fisc_montant: form.montant,
    fisc_date: form.date,
    fisc_comments: form.commentaires ?? null,
  };
}

export function mapFiscFormToUpdate(form: FiscFormValues): FiscUpdate {
  return {
    fisc_soc_id: null,
    fisc_exer_id: form.exerciceId,
    fisc_type_id: form.typeId,
    fisc_montant: form.montant,
    fisc_date: form.date,
    fisc_comments: form.commentaires ?? null,
    fisc_lmod: new Date().toISOString(),
  };
}