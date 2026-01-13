

import type { LotTravView } from "@/domain/lottrav/lottrav-view";
import type { LotTravFormValues, OperatorOption } from "./lottrav-form.types";


export interface LotTravFormProps {
  initialLot: LotTravView | null;

  errors: LotTravFormErrors;

 onChange?: (data: LotTravFormValues) => void;
operators: OperatorOption[];

}

export type LotTravFormErrors = {
  fields?: {
    name?: string;
    startDate?: string;
    endDate?: string;
    statusId?: string;
  };
  global?: string[];
};
