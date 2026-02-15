

// src/domain/client/client-mapper.ts

import type { ClientRow, ClientInsert, ClientUpdate } from "@/domain/_db/rows";
import type { ClientView } from "./client-types";
import type { ClientFormValues } from "@/ui/client/client-form.types";
import { reqStr, reqBool } from "@/helpers/row-guards";

const VIEW_NAME = "vw_client_view";

export function mapClientRowToView(row: ClientRow): ClientView {
  return {
    id: reqStr(row.clt_id, "clt_id", VIEW_NAME),
    nom: reqStr(row.clt_nom, "clt_nom", VIEW_NAME),
    code: reqStr(row.clt_code, "clt_code", VIEW_NAME),

    adresse: row.clt_adresse ?? null,
    codePostal: row.clt_code_postal ?? null,
    ville: row.clt_ville ?? null,
    pays: row.clt_pays ?? null,
    email: row.clt_email ?? null,
    telephone: row.clt_telephone ?? null,

    actif: reqBool(row.clt_actif, "clt_actif", VIEW_NAME),
    lmod: row.lmod ?? "",
  };
}

export function mapClientFormToInsert(form: ClientFormValues): ClientInsert {
  return {
    clt_nom: form.nom,
    clt_code: form.code,
    clt_adresse: form.adresse || null,
    clt_code_postal: form.codePostal || null,
    clt_ville: form.ville || null,
    clt_pays: form.pays || null,
    clt_email: form.email || null,
    clt_telephone: form.telephone || null,
    clt_actif: form.actif,
  };
}

export function mapClientFormToUpdate(form: ClientFormValues): ClientUpdate {
  return mapClientFormToInsert(form);
}