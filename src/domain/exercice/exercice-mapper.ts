

// src/domain/exercice/exercice-mapper.ts

import type { ExerciceRow, ExerciceInsert, ExerciceUpdate } from "@/domain/_db/rows";
import type { ExerciceView } from "./exercice-types";
import type { ExerciceFormValues } from "@/ui/exercice/exercice-form.types";
import { reqStr, reqBool } from "@/helpers/row-guards";

export function mapExerciceRowToView(row: ExerciceRow): ExerciceView {
  return {
    id: reqStr(row.exer_id, "exer_id", "vw_exercice_view"),

    clientId: reqStr(row.clt_id, "clt_id", "vw_exercice_view"),
    clientNom: row.clt_nom ?? null,

    code: reqStr(row.exer_code, "exer_code", "vw_exercice_view"),

    debut: reqStr(row.exer_debut, "exer_debut", "vw_exercice_view"),
    fin: reqStr(row.exer_fin, "exer_fin", "vw_exercice_view"),

    actif: reqBool(row.exer_actif, "exer_actif", "vw_exercice_view"),
    commentaires: row.exer_commentaires ?? null,
    lmod: row.lmod ?? "",
  };
}

export function mapExerciceFormToInsert(
  form: ExerciceFormValues,
  cltId: string
): ExerciceInsert {
  return {
    clt_id: cltId,
    exer_code: form.code,
    exer_debut: form.debut,
    exer_fin: form.fin,
    exer_actif: form.actif,
    exer_commentaires: form.commentaires ?? null,
  };
}

export function mapExerciceFormToUpdate(form: ExerciceFormValues): ExerciceUpdate {
  return {
    exer_code: form.code,
    exer_debut: form.debut,
    exer_fin: form.fin,
    exer_actif: form.actif,
    exer_commentaires: form.commentaires ?? null,
  };
}