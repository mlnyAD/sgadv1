

// src/domain/licence/licence.ui.ts

import type { LicenceStatus } from "./licence.catalog";

export interface LicenceUI {
  id: string;
  clientId: string;
  clientLabel: string;

  nom: string;

  status: LicenceStatus;

  startDate: string;
  endDate: string | null;
}
