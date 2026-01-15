

// domain/lottrav/lottrav-view.ts

import { LotTravStatusId } from "./lottrav-status";


export interface LotTravView {
  id: number;
  nom: string;
  start: Date | null;
  end: Date | null;
  statusId: LotTravStatusId;
  projectId: number;
  responsableId: number | null;
  responsableEmail?: string | null;
  lastModified: Date;
}
