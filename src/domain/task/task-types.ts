

export type CreateTaskInput = {
  task_nom: string;
  task_responsable_id: number | null;
  task_etat_id: number;
  task_start: string | null;
  task_end: string | null;
  task_duree: number;
  task_avancement: number;
};

export type UpdateTaskInput = CreateTaskInput;


export type TaskPersistencePayload = {
	task_nom: string;
	task_start: string | null;
	task_end: string | null;
	task_duree: number;
	task_avancement: number;
	task_etat_id: number;
	task_responsable_id: number | null;
};