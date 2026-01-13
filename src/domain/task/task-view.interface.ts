
import type { TaskStatusId } from "./task.catalog";

export interface TaskView {
	taskId: number;
	taskNom: string;
	taskResponsableId: number;
	persEmail: string;
	taskStart: Date;
	taskEnd: Date;
	taskDuree: number;
	taskAvancement: number;
	taskEtatId: TaskStatusId;
	nom: string;
	lottravId: number;
	lottravNom: string;
	projectId: number;
	projectIdent: string;
}; 


