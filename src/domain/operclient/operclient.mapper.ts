

// src/domain/operclient/operclient.mapper.ts

import type { OperClientRow } from "@/domain/_db/rows";
import type { OperClientView } from "./operclient-types";
import { reqStr, reqBool } from "@/helpers/row-guards";

const VIEW_NAME = "vw_operateur_client_view";

export function mapOperClientRowToView(row: OperClientRow): OperClientView {
  return {
    id: reqStr(row.opcl_id, "opcl_id", VIEW_NAME),

    operateurId: reqStr(row.oper_id, "oper_id", VIEW_NAME),
    operateurNom: reqStr(row.oper_nom, "oper_nom", VIEW_NAME),
    operateurEmail: reqStr(row.oper_email, "oper_email", VIEW_NAME),
    operateurActif: reqBool(row.oper_actif, "oper_actif", VIEW_NAME),

    clientId: reqStr(row.clt_id, "clt_id", VIEW_NAME),
    clientNom: reqStr(row.clt_nom, "clt_nom", VIEW_NAME),
    clientActif: reqBool(row.clt_actif, "clt_actif", VIEW_NAME),

    lmod: row.lmod ?? "",
  };
}