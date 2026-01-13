

import { TaskDbRow, TaskDbViewRow } from "./task.db";
import { TaskUI } from "./task.ui";

/* ------------------------------------------------------------------
   DB View -> DB Row
   ------------------------------------------------------------------ */

export function mapTaskDbViewToDbRow(
	view: TaskDbViewRow
): TaskDbRow {
	return {
		task_id: view.task_id,
		task_nom: view.task_nom,

		task_responsable_id: view.task_responsable_id,
		task_etat_id: view.task_etat_id,

		task_start: view.task_start,
		task_end: view.task_end,

		task_duree: view.task_duree,
		task_avancement: view.task_avancement,

		//project_id: view.project_id,
		//lottrav_id: view.lottrav_id,
	}
}

/* ------------------------------------------------------------------
   DB Row -> UI
   ------------------------------------------------------------------ */

export function mapTaskDbRowToUI(
	row: TaskDbRow
): TaskUI {
	if (!row.task_id) {
		throw new Error("task_id requis pour mapping UI");
	}
	return {
	id: 0,
	nom: "",
	responsable_id: 0,
	etat_id: null,
	start: "",
	end: "",
	duree: 0,
	avancement: 0,
	project_id: 0,
	lottrav_id: 0
} 
}


/*		id: row.task_id,

		nom: row.task_nom,

		responsable_id: row.task_responsable_id,
		etat_id: row.task_etat_id,

		start: row.task_start,
		end: row.task_end,

		duree: row.task_duree,
		avancement: row.task_avancement,

		//project_id: row.project_id,
		//lottrav_id: row.lottrav_id,

*/