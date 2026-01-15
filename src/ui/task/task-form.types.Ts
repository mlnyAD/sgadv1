
// ui/task/task-form.types.ts

import type { TaskStatusId } from "@/domain/task/task-status";
/* ------------------------------------------------------------------
   Options
   ------------------------------------------------------------------ */

export interface OperatorOption {
  id: number;
  label: string;
}

/* ------------------------------------------------------------------
   Form values
   ------------------------------------------------------------------ */

export type TaskFormValues = {
  name: string;
  startDate: string;
  endDate: string;
  duree: number;
  avancement: number;
  etatId: TaskStatusId;
  responsableId: number | null;
};
