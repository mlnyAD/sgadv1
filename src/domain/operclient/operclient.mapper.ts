

import type { OperClientView } from "./operclient-types";

export function mapOperClientRowToView(row: any): OperClientView {
  return {
    id: row.operclt_id,

    operateurId: row.oper_id,
    operateurNom: row.oper_nom,
    operateurEmail: row.oper_email,
    operateurActif: row.oper_actif,

    clientId: row.clt_id,
    clientNom: row.clt_nom,
    clientActif: row.clt_actif,

    createdAt: row.operclt_created_at,
  };
}
