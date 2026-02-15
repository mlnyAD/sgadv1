

// src/domain/operateur/operateur.mapper.ts

import type { OperateurPersistencePayload, OperateurView } from "./operateur-types";
import type { OperateurFormValues } from "@/ui/operateur/operateur-form.types";
import type { OperateurRow } from "@/domain/_db/rows";
import type { AuthenticatedOperateur } from "./authenticated-operateur.interface";
import { reqBool, reqStr } from "@/helpers/row-guards";

/* ------------------------------------------------------------------ */
/* DB (view row) → View                                                */
/* ------------------------------------------------------------------ */
export function mapOperateurRowToView(row: OperateurRow): OperateurView {
  const src = "vw_operateur_view";
  return {
    id: reqStr(row.oper_id, "oper_id", src),
    email: reqStr(row.oper_email, "oper_email", src),

    nom: row.oper_nom ?? null,
    prenom: row.oper_prenom ?? null,

    isAdminSys: reqBool(row.oper_admin_sys, "oper_admin_sys", src),
    actif: reqBool(row.oper_actif, "oper_actif", src),
    mustChangePassword: reqBool(row.must_change_pwd, "must_change_pwd", src),
  };
}

/* ------------------------------------------------------------------ */
/* Form → View                                                         */
/* ------------------------------------------------------------------ */
export function mapFormToOperateurView(
  form: OperateurFormValues,
  operateurId?: string
): OperateurView {
  return {
    id: operateurId ?? "",
    email: form.email,
    prenom: form.prenom,
    nom: form.nom,
    isAdminSys: form.isAdminSys,
    actif: form.actif,
    mustChangePassword: form.mustChangePassword,
  };
}

/* ------------------------------------------------------------------ */
/* View → DB payload (table)                                           */
/* ------------------------------------------------------------------ */
export function mapOperateurFormToPersistence(
  form: OperateurFormValues
): OperateurPersistencePayload {
  return {
    oper_nom: form.nom,
    oper_prenom: form.prenom,
    oper_email: form.email,
    oper_admin_sys: form.isAdminSys,
    oper_actif: form.actif,
    // ⚠️ must_change_pwd NON touché ici
  };
}

/* ------------------------------------------------------------------ */
/* DB (view row) → AuthenticatedOperateur                              */
/* ------------------------------------------------------------------ */
export function mapOperateurDbRowToAuthenticated(
  row: OperateurRow,
  clientIds: string[]
): AuthenticatedOperateur {
  const src = "vw_operateur_view";
  return {
    operId: reqStr(row.oper_id, "oper_id", src),
    email: reqStr(row.oper_email, "oper_email", src),
    nom: row.oper_nom ?? null,
    prenom: row.oper_prenom ?? null,
    isAdminSys: reqBool(row.oper_admin_sys, "oper_admin_sys", src),
    isActif: reqBool(row.oper_actif, "oper_actif", src),
    mustChangePassword: reqBool(row.must_change_pwd, "must_change_pwd", src),
    clientIds,
  };
}

export function mapOperateurViewToFormValues(
  view: OperateurView
): OperateurFormValues {
  return {
    id: view.id,
    nom: view.nom ?? "",
    prenom: view.prenom ?? "",
    email: view.email,
    isAdminSys: view.isAdminSys,
    actif: view.actif,
    mustChangePassword: view.mustChangePassword,
  };
}