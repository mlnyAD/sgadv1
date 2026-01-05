

// src/domain/client/client.mapper.ts

import { ClientUI } from "./client.ui";
import { ClientStatus } from "./client.catalog";


/* ------------------------------------------------------------------
   CREATE
   ------------------------------------------------------------------ */
export function mapClientUIToDbCreate(
  ui: ClientUI,
  createdBy: string
) {
  return {
    client_nom: ui.nom,
    client_adresse: ui.adresse ?? null,
    client_code_postal: ui.codePostal ?? null,
    client_ville: ui.ville ?? null,
    client_siren: ui.siren ?? null,
    client_status: ui.status,
    client_created_by: createdBy,
  };
}

/* ------------------------------------------------------------------
   UPDATE
   ------------------------------------------------------------------ */
export function mapClientUIToDbUpdate(
  ui: ClientUI
) {
  return {
    client_nom: ui.nom,
    client_adresse: ui.adresse ?? null,
    client_code_postal: ui.codePostal ?? null,
    client_ville: ui.ville ?? null,
    client_siren: ui.siren ?? null,
    client_status: ui.status,
  };
}


/* ------------------------------------------------------------------
   DB -> UI (lecture)
   ------------------------------------------------------------------ */
export interface ClientDbRow {
  client_id: number;
  client_nom: string;
  client_adresse: string | null;
  client_code_postal: string | null;
  client_ville: string | null;
  client_siren: string | null;
  client_status: ClientStatus; 
}

export function mapClientDbToUI(
  row: ClientDbRow
): ClientUI {
  return {
    id: row.client_id,
    nom: row.client_nom,
    adresse: row.client_adresse,
    codePostal: row.client_code_postal,
    ville: row.client_ville,
    siren: row.client_siren,
    status: row.client_status,
  };
}
