// Transformation explicite et centralisée
// Tout ce qui sort de la BD passe par mapXxxDbToUI
// Tout ce qui entre en BD passe par mapXxxUIToDb
// src/domain/config/config.mapper.ts

import { ConfigDbRow } from "./config.db";
import { ConfigUI } from "./config.ui";


/* ------------------------------------------------------------------ */
/* DB -> UI (lecture) */
/* ------------------------------------------------------------------ */
export function mapConfigDbToUI(row: ConfigDbRow): ConfigUI {
  return {
    id: row.config_id,
    nom: row.config_nom,
    typeId: row.config_type,
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
export interface ConfigDbWrite {
  config_nom: string;
  config_type: number;
}

export function mapConfigUIToDb(
  ui: ConfigUI
): ConfigDbWrite {
  return {
    config_nom: ui.nom,
    config_type: ui.typeId ?? null,
  };
}
