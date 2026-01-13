

import type { LotTravView } from "@/domain/lottrav/lottrav-view.interface";
import type { LotTravStatusId } from "@/domain/lottrav/lottrav.catalog";

export interface OperatorOption {
  id: number;
  label: string;
}

export interface LotTravFormProps {
  initialLot: LotTravView | null;
  operators: OperatorOption[];
  errors: LotTravFormErrors;

  onChange?: (data: {
    name: string;
    startDate: string;
    endDate: string;
    statusId: LotTravStatusId;
    responsableId: number | null;
  }) => void;
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
