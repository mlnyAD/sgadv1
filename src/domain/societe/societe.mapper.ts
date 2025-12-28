
// Transformation explicite et centralisée
// Tout ce qui sort de la BD passe par mapXxxDbToUI
// Tout ce qui entre en BD passe par mapXxxUIToDb
// src/domain/societe/societe.mapper.ts

import { SocieteDbRow } from "./societe.db";
import { SocieteUI } from "./societe.ui";

/* ------------------------------------------------------------------ */
/* DB -> UI (lecture) */
/* ------------------------------------------------------------------ */

export function mapSocieteDbToUI(
  row: SocieteDbRow
): SocieteUI {
  return {
    id: row.societe_id,
    nom: row.societe_nom,
    adresse1: row.societe_adresse1 ?? undefined,
    adresse2: row.societe_adresse2 ?? undefined,
    adresse3: row.societe_adresse3 ?? undefined,
    ville: row.societe_ville ?? undefined,
    codePostal: row.societe_code_postal ?? undefined,
  };
}

/* ------------------------------------------------------------------ */
/* UI -> DB (écriture) */
/* ------------------------------------------------------------------ */

/**
 * Payload utilisé pour CREATE / UPDATE.
 * - Pas d'id (clé technique)
 * - Noms strictement BD
 */
export interface SocieteDbWrite {
  societe_nom: string;
  societe_adresse1: string | null;
  societe_adresse2: string | null;
  societe_adresse3: string | null;
  societe_ville: string | null;
  societe_code_postal: string | null;
}

export function mapSocieteUIToDb(
  ui: SocieteUI
): SocieteDbWrite {
  return {
    societe_nom: ui.nom,
    societe_adresse1: ui.adresse1 ?? null,
    societe_adresse2: ui.adresse2 ?? null,
    societe_adresse3: ui.adresse3 ?? null,
    societe_ville: ui.ville ?? null,
    societe_code_postal: ui.codePostal ?? null,
  };
}
