

// src/domain/licence/licence.db.ts

import { LicenceStatus } from "./licence.catalog";

export interface LicenceDbRow {
  licence_id: number;
  client_id: number;
  licence_status: LicenceStatus;
  licence_start_at: Date;
  licence_end_at?: Date | null;
  lmod: Date;
}
