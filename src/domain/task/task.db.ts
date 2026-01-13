

import type { TaskStatusId } from "./task.catalog";

/* ------------------------------------------------------------------
   Table Task – DB row (écriture)
   ------------------------------------------------------------------ */

export interface TaskDbRow {
  task_id?: number;
  task_nom: string;

  task_responsable_id: number;
  task_etat_id: TaskStatusId | null;

  task_start: string;
  task_end: string;

  task_duree: number;
  task_avancement: number;

  project_id?: number;
  lottrav_id?: number;
};



/* ------------------------------------------------------------------
   Vue SQL – vw_task (lecture)
   ------------------------------------------------------------------ */

export interface TaskDbViewRow {
  task_id: number;
  task_nom: string;

  task_responsable_id: number;
  task_etat_id: TaskStatusId | null;

  task_start: string;
  task_end: string;

  task_duree: number;
  task_avancement: number;

  project_id?: number;
  lottrav_id?: number;

  /* libellés issus de config (lecture uniquement) */
  task_etat_nom?: string | null;
  project_ident: string | null;
  lottrav_nom?: string | null;
};
