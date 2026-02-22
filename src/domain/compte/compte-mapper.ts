

// src/domain/compte/compte-mapper.ts

import type { TroCompteRow, TroCompteInsert, TroCompteUpdate } from "@/domain/_db/rows";
import type { CompteView } from "./compte-types";
import type { CompteFormValues } from "@/ui/compte/compte-form.types";
import { reqStr, reqBool, reqNum } from "@/helpers/row-guards";

export function mapCompteRowToView(row: TroCompteRow): CompteView {
  return {
    id: reqStr(row.tro_cpt_id, "tro_cpt_id", "vw_tro_compte_view"),

    clientId: reqStr(row.tro_clt_id, "tro_clt_id", "vw_tro_compte_view"),
    societeId: row.tro_soc_id ?? null,

    nom: reqStr(row.tro_cpt_nom, "tro_cpt_nom", "vw_tro_compte_view"),
    ordre: reqNum(row.tro_cpt_ordre, "tro_cpt_ordre", "vw_tro_compte_view"),

    actif: reqBool(row.tro_cpt_actif, "tro_cpt_actif", "vw_tro_compte_view"),
    inclusGlobal: reqBool(row.tro_cpt_inclus_global, "tro_cpt_inclus_global", "vw_tro_compte_view"),

    lmod: row.tro_lmod ?? "",
  };
}

export function mapCompteFormToInsert(form: CompteFormValues): Omit<TroCompteInsert, "tro_clt_id"> {
  return {
    tro_soc_id: form.societeId ?? null,
    tro_cpt_nom: form.nom,
    tro_cpt_ordre: form.ordre,
    tro_cpt_actif: form.actif,
    tro_cpt_inclus_global: form.inclusGlobal,
  };
}

export function mapCompteFormToUpdate(form: CompteFormValues): TroCompteUpdate {
  return {
    tro_soc_id: form.societeId ?? null,
    tro_cpt_nom: form.nom,
    tro_cpt_ordre: form.ordre,
    tro_cpt_actif: form.actif,
    tro_cpt_inclus_global: form.inclusGlobal,
  };
}