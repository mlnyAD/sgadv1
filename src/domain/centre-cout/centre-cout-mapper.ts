

// src/domain/centre-cout/centre-cout-mapper.ts

import type {
  CentreCoutDbRow,
  CentreCoutView,
  CentreCoutFormValues,
  CentreCoutPersistencePayload,
} from "./centre-cout-types";

import {
  CentreCoutFamilleId,
  getFamilleById,
} from "./centre-cout-familles.catalog";

/* ------------------------------------------------------------------
   UI (form) -> DB (CREATE / UPDATE)
   ------------------------------------------------------------------ */

export function mapCentreCoutFormToDb(
  ui: CentreCoutFormValues
): CentreCoutPersistencePayload {
  return {
    cc_code: ui.code,
    cc_libelle: ui.libelle,

    clt_id: ui.clientId,
    famille_id: ui.familleId,

    cc_commentaires: ui.commentaires ?? null,
    cc_actif: ui.actif,
  };
}

/* ------------------------------------------------------------------
   DB -> VIEW (lecture)
   ------------------------------------------------------------------ */

export function mapCentreCoutDbToView(
  row: CentreCoutDbRow
): CentreCoutView {
  const famille = getFamilleById(row.famille_id as CentreCoutFamilleId);

  //console.log("mapCentreCoutDbToView " ,row )

  return {
    id: row.cc_id,

    code: row.cc_code,
    libelle: row.cc_libelle,

    clientId: row.clt_id,
    clientNom: row.clt_nom ?? null,

    familleId: row.famille_id,
    familleLibelle: famille?.libelle ?? "—",

    commentaires: row.cc_commentaires ?? null,
    actif: row.cc_actif,
  };
}
