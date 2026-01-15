		/* Etats d'une tâche */
// domain/task/task-status.ts

export const TASK_STATUS_CATALOG = [
	{	id: 1,	label: "En attente",},
	{	id: 2,	label: "En cours",},
	{	id: 3,	label: "Suspendue",},
	{	id: 4,	label: "Abandonnée",},
	{	id: 5,	label: "En retard",},
	{	id: 6,	label: "Terminée",},
] as const;


export type TaskStatusId = (typeof TASK_STATUS_CATALOG) [number]["id"];

export function getTaskStatusLabel(id: TaskStatusId): string {
  return TASK_STATUS_CATALOG.find(s => s.id === id)?.label ?? "Inconnu";
}

export const TASK_STATUS_OPTIONS = TASK_STATUS_CATALOG.map(s => ({
  id: s.id,
  label: s.label,
}));