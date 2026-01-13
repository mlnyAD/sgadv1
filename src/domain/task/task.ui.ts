


// src/domain/task/task.ui.ts

import type { TaskStatusId } from "./task.catalog";

/* ------------------------------------------------------------------
   TaskUI
   Objet de référence pour l’affichage UI (read / edit)
   ------------------------------------------------------------------ */

export interface TaskUI {

	id: number;
	nom: string;

	responsable_id: number;
	etat_id: TaskStatusId | null;

	start: string;
	end: string;

	duree: number;
	avancement: number;

	project_id: number;
	lottrav_id: number;
};
