

// src/domain/licence/licence.ui.ts

import { LicenceStatus } from "./licence.catalog";

export interface LicenceUI {
  id?: number;
  clientId: number;
  status: LicenceStatus;
  startAt: Date;
  endAt?: Date | null;
}
