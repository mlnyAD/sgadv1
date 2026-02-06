

// src/domain/client/client.mapper.ts

import { ClientUI } from "./client-types";
import { ClientDbRow } from "./client-types";


/* ------------------------------------------------------------------
   CREATE
   ------------------------------------------------------------------ */
export function mapClientUIToDbCreate(ui: ClientUI) {
  return {
    clt_nom: ui.nom,
    clt_code: ui.code,
    clt_adresse: ui.adresse,
    clt_code_postal: ui.codePostal,
    clt_ville: ui.ville,
    clt_pays: ui.pays,
    clt_email: ui.email,
    clt_telephone: ui.telephone,
    clt_actif: ui.actif,
  };
}

/* ------------------------------------------------------------------
   UPDATE
   ------------------------------------------------------------------ */
export function mapClientUIToDbUpdate(ui: ClientUI) {
  return {
    clt_nom: ui.nom,
    clt_code: ui.code,
    clt_adresse: ui.adresse,
    clt_code_postal: ui.codePostal,
    clt_ville: ui.ville,
    clt_pays: ui.pays,
    clt_email: ui.email,
    clt_telephone: ui.telephone,
    clt_actif: ui.actif,
  };
}

/* ------------------------------------------------------------------
   DB -> UI (lecture)
   ------------------------------------------------------------------ */
export function mapClientDbToUI(row: ClientDbRow): ClientUI {
  return {
    id: row.client_id,
    nom: row.client_nom,
    code: row.client_code,
    adresse: row.adresse,
    codePostal: row.code_postal,
    ville: row.ville,
    pays: row.pays,
    email: row.email,
    telephone: row.telephone,
    actif: row.actif,
  };
}


