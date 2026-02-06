

// src/domain/client/client-view.mapper.ts

import type { ClientView } from "./client-types";
import type { ClientViewRow } from "./client-types";

export function mapClientViewRowToUI(
  row: ClientViewRow
): ClientView {
  return {
    id: row.clt_id,
    nom: row.clt_nom,
    code: row.clt_code,

    adresse: row.clt_adresse ?? null,
    codePostal: row.clt_code_postal ?? null,
    ville: row.clt_ville ?? null,
    pays: row.clt_pays ?? null,

    email: row.clt_email ?? null,
    telephone: row.clt_telephone ?? null,

    actif: row.clt_actif,
  };
}
