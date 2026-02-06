

// src/domain/centre-cout/centre-cout-mapper.ts

import { dateInputToUtcDate } from "@/helpers/date";
import type {
	ExerciceDbRow,
	ExerciceView,
	ExerciceFormValues,
	ExercicePersistencePayload,
} from "./exercice-types";


/* ------------------------------------------------------------------
   UI (form) -> DB (CREATE / UPDATE)
   ------------------------------------------------------------------ */

export function mapExerciceFormToDb(
	ui: ExerciceFormValues
): ExercicePersistencePayload {
	return {
				
		exer_code: ui.code,

		clt_id: ui.cltId,

		exer_debut: dateInputToUtcDate(ui.debut),
		exer_fin: dateInputToUtcDate(ui.fin),

		exer_actif: ui.actif,
		exer_commentaires: ui.commentaires ?? null,
	};
}

/* ------------------------------------------------------------------
   DB -> VIEW (lecture)
   ------------------------------------------------------------------ */

export function mapExerciceDbToView(
	row: ExerciceDbRow
): ExerciceView {

	//console.log("mapExerciceDbToView " ,row )

	return {
		id: row.exer_id,

		code: row.exer_code,
		cltId: row.clt_id,

		debut: row.exer_debut,
		fin: row.exer_fin,

		actif: row.exer_actif,
		commentaires: row.exer_commentaires ?? null,

	};
}

