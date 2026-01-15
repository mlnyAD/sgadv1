

// domain/task/task-view.ts

import type { TaskStatusId } from "./task-status";


export interface TaskView {
  id: number;
  nom: string;
  etatId: TaskStatusId;
  responsableId: number | null;
  responsableEmail: string | null;
  start: Date | null;
  end: Date | null;
  duree: number;
  avancement: number;
  projectId: number;
  lotTravId: number;
}


