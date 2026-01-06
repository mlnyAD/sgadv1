

// src/domain/licence/licence.mapper.ts

import { LicenceDbRow } from "./licence.db";
import type { LicenceUI } from "./licence.ui";
import type { LicenceStatus } from "./licence.catalog";
import type { LicenceFormValues } from "@/domain/licence/licence.form.types";


/* ------------------------------------------------------------------ */
/* DB -> UI (lecture depuis vw_licence) */
/* ------------------------------------------------------------------ */
export function mapLicenceDbToUI(
  row: LicenceDbRow
): LicenceUI {
  return {
    id: row.id,

    clientId: row.client_id,
    clientLabel: row.client_label,

    nom: row.nom,

    status: row.status as LicenceStatus,

    startDate: row.start_date,
    endDate: row.end_date,
  };
}

/* ------------------------------------------------------------------ */
/* UI -> DB (écriture vers licence) */
/* ------------------------------------------------------------------ */

export interface LicenceDbWrite {
  client_id: string;
  licence_name: string;
  licence_status: string;
  licence_start: string;
  licence_end?: string | null;
}

export function mapLicenceUIToDb(ui: LicenceUI) {
  return {
    client_id: ui.clientId,
    licence_name: ui.nom,
    licence_status: ui.status,
    licence_start: ui.startDate,
    licence_end: ui.endDate,
  };
}

export function mapLicenceFormToUI(
  form: LicenceFormValues
): LicenceUI {
  if (!form.clientId) {
    throw new Error("Client obligatoire");
  }

  if (!form.startDate) {
    throw new Error("Date de début obligatoire");
  }

  return {
    id: "", // ignoré à la création
    clientId: form.clientId,
    clientLabel: "", // non utilisé en écriture
    nom: form.nom.trim(),
    status: form.status,
    startDate: form.startDate,
    endDate: form.endDate ?? null,
  };
}