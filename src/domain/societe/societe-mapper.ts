

// src/domain/societe/societe-mapper.ts

import type { SocieteRow, SocieteInsert, SocieteUpdate } from "@/domain/_db/rows";
import type { SocieteView } from "./societe-types";
import type { SocieteFormValues } from "@/ui/societe/societe-form.types";
import { reqStr } from "@/helpers/row-guards";

export function mapSocieteRowToView(row: SocieteRow): SocieteView {
  return {
    id: reqStr(row.soc_id, "soc_id", "vw_societe_view"),

    cltId: reqStr(row.clt_id, "clt_id", "vw_societe_view"),
    cltNom: row.clt_nom ?? null,

    nom: reqStr(row.soc_nom, "soc_nom", "vw_societe_view"),
    code: reqStr(row.soc_code, "soc_code", "vw_societe_view"),

    adresse: row.soc_adresse ?? null,
    ville: row.soc_ville ?? null,
    codePostal: row.soc_code_postal ?? null,
    pays: row.soc_pays ?? null,
    telephone: row.soc_telephone ?? null,

    siren: row.soc_siren ?? null,

    client: row.soc_client ?? false,
    fournisseur: row.soc_fournisseur ?? false,

    lmod: row.lmod ?? "",
  };
}

export function mapSocieteFormToInsert(form: SocieteFormValues, cltId: string): SocieteInsert {
  return {
    clt_id: cltId,
    soc_nom: form.nom,
    soc_code: form.code,
    soc_adresse: form.adresse ?? null,
    soc_ville: form.ville ?? null,
    soc_pays: form.pays ?? null,
    soc_code_postal: form.codePostal ?? null,
    soc_telephone: form.telephone ?? null,
    soc_siren: form.siren ?? null,
    soc_client: form.client,
    soc_fournisseur: form.fournisseur,
  };
}

export function mapSocieteFormToUpdate(form: SocieteFormValues): SocieteUpdate {
  return {
    soc_nom: form.nom,
    soc_code: form.code,
    soc_adresse: form.adresse ?? null,
    soc_ville: form.ville ?? null,
    soc_pays: form.pays ?? null,
    soc_code_postal: form.codePostal ?? null,
    soc_telephone: form.telephone ?? null,
    soc_siren: form.siren ?? null,
    soc_client: form.client,
    soc_fournisseur: form.fournisseur,
  };
}