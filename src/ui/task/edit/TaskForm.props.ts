

import type { TaskView } from "@/domain/task/task-view";
import type { TaskFormValues, OperatorOption } from "../task-form.types";


export interface TaskFormProps {
  initialLot: TaskView | null;

  errors: TaskFormErrors;

 onChange?: (data: TaskFormValues) => void;
operators: OperatorOption[];

}

export type TaskFormErrors = {
  fields?: {
    nom?: string;
    startDate?: string;
    endDate?: string;
    etatId?: string;
    duree?: string;
    avancement?: string;
  };
  global?: string[];
};