

// ui/lottrav/lottrav-form.types.ts

import type { LotTravStatusId } from "@/domain/lottrav/lottrav-status";

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

export interface LotTravFormValues {
  name: string;
  startDate: string;
  endDate: string;
  statusId: LotTravStatusId;
  responsableId: number | null;
}
