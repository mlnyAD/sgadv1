

import type { LicenceStatus } from "@/domain/licence/licence.catalog";

export interface LicenceFormValues {
  nom: string;

  clientId: string | null;
  status: LicenceStatus;

  startDate: string | null;
  endDate: string | null;
}
