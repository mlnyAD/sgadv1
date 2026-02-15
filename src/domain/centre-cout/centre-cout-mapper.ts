

// src/domain/centre-cout/centre-cout-mapper.ts

import type { CentreCoutView } from "./centre-cout-types";
import type { CentreCoutFormValues } from "@/ui/centre-cout/centre-cout-form.types";
import type { CentreCoutRow, CentreCoutInsert, CentreCoutUpdate } from "@/domain/_db/rows";
import { reqStr } from "@/helpers/row-guards";
import { toCentreCoutFamilleId } from "./centre-cout-familles.catalog";

/* ------------------------------------------------------------------
   Form -> DB (Update)
   ------------------------------------------------------------------ */
export function mapCentreCoutFormToUpdate(ui: CentreCoutFormValues): CentreCoutUpdate {
  return {
    cc_code: ui.code,
    cc_libelle: ui.libelle,
    famille_id: ui.familleId, // OK: CentreCoutFamilleId est un number union
    cc_commentaires: ui.commentaires ?? null,
    cc_actif: ui.actif,
  };
}

/* ------------------------------------------------------------------
   Form -> DB (Insert)
   ------------------------------------------------------------------ */
export function mapCentreCoutFormToInsert(ui: CentreCoutFormValues): Omit<CentreCoutInsert, "clt_id"> {
  return {
    cc_code: ui.code,
    cc_libelle: ui.libelle,
    famille_id: ui.familleId,
    cc_commentaires: ui.commentaires ?? null,
    cc_actif: ui.actif,
  };
}

/* ------------------------------------------------------------------
   DB (view row) -> View
   ------------------------------------------------------------------ */
export function mapCentreCoutRowToView(row: CentreCoutRow): CentreCoutView {
  return {
    id: reqStr(row.cc_id, "cc_id", "vw_centre_cout_view"),
    clientId: reqStr(row.clt_id, "clt_id", "vw_centre_cout_view"),
    clientNom: row.clt_nom ?? null,

    // ✅ conversion number|null -> CentreCoutFamilleId (1..8)
    familleId: toCentreCoutFamilleId(row.famille_id ?? 8),

    code: reqStr(row.cc_code, "cc_code", "vw_centre_cout_view"),
    libelle: reqStr(row.cc_libelle, "cc_libelle", "vw_centre_cout_view"),

    actif: row.cc_actif ?? false,
    commentaires: row.cc_commentaires ?? null,
    lmod: row.lmod ?? "",
  };
}