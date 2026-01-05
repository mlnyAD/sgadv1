

// src/domain/licence/licence.mapper.ts

import { LicenceDbRow } from "./licence.db";
import { LicenceUI } from "./licence.ui";

/* ------------------------------------------------------------------ */
/* DB -> UI (lecture) */
/* ------------------------------------------------------------------ */
export function mapLicenceDbToUI(row: LicenceDbRow): LicenceUI {
  return {
    id: row.licence_id,
    clientId: row.client_id,
    status: row.licence_status,
    startAt: row.licence_start_at,
    endAt: row.licence_end_at ?? null,
  };
}

/* ------------------------------------------------------------------ */
/* UI -> DB (écriture) */
/* ------------------------------------------------------------------ */

export interface LicenceDbWrite {
  client_id: number;
  licence_status: string;
  licence_start_at: Date;
  licence_end_at?: Date | null;
}

export function mapLicenceUIToDb(
  ui: LicenceUI
): LicenceDbWrite {
  return {
    client_id: ui.clientId,
    licence_status: ui.status,
    licence_start_at: ui.startAt,
    licence_end_at: ui.endAt ?? null,
  };
}
