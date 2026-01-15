

import { TaskStatusId } from "./task-status";
import { TaskView } from "./task-view";


/* ------------------------------------------------------------------
   Table Task – DB row (écriture)
   ------------------------------------------------------------------ */

export interface DbTaskRow {
	task_id: number;
	task_nom: string;

	task_responsable_id: number | null;
	responsable_email: string | null;

	task_etat_id: number;

	task_start: string | null;
	task_end: string | null;

	task_duree: number;
	task_avancement: number;

	project_id: number;
	lottrav_id: number;

};


/* ------------------------------------------------------------------
   DB View -> DB Row
   ------------------------------------------------------------------ */

export function mapDbTaskToView( row: DbTaskRow ): TaskView {

	return {

		id: row.task_id,
		nom: row.task_nom,

		responsableId: row.task_responsable_id,
		responsableEmail: row.responsable_email ?? null,

		etatId: row.task_etat_id as TaskStatusId,

		start: row.task_start
			? new Date(row.task_start)
			: null,
		end: row.task_end
			? new Date(row.task_end)
			: null,

		duree: row.task_duree,
		avancement: row.task_avancement,

		projectId: row.project_id,
		lotTravId: row.lottrav_id,

	}
}
