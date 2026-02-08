

// src/domain/centre-cout/centre-cout-mapper.ts

import type {
  CentreCoutDbRow,
  CentreCoutView,
  CentreCoutFormValues,
  CentreCoutPersistencePayload,
} from "./centre-cout-types";

import { getFamilleById, toCentreCoutFamilleId } from "./centre-cout-familles.catalog";

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

export function mapCentreCoutDbToView(row: CentreCoutDbRow): CentreCoutView {
  const familleId = toCentreCoutFamilleId(row.famille_id);
  const famille = getFamilleById(familleId);

  return {
    id: row.cc_id,
    code: row.cc_code,
    libelle: row.cc_libelle,

    clientId: row.clt_id,
    clientNom: row.clt_nom ?? null,

    familleId,
    familleLibelle: famille?.libelle ?? "—",

    commentaires: row.cc_commentaires ?? null,
    actif: row.cc_actif,
  };
}