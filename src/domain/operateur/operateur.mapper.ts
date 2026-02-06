

// src/domain/operateur/operateur.mapper.ts

import type { OperateurPersistencePayload, OperateurView } from "./operateur-types";
import type { OperateurFormValues } from "@/ui/operateur/operateur-form.types";
import type { OperateurDbRow } from "./operateur-types";
import { AuthenticatedOperateur } from "./authenticated-operateur.interface";


/* ------------------------------------------------------------------ */
/* DB → View                                                           */
/* ------------------------------------------------------------------ */
export function mapOperateurRowToView(
  row: OperateurDbRow
): OperateurView {
  return {
    id: row.oper_id,
    email: row.oper_email,

    nom: row.oper_nom,
    prenom: row.oper_prenom,

    isAdminSys: row.oper_admin_sys,
    actif: row.oper_actif,
    mustChangePassword: row.must_change_pwd,
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
/* View → DB                                                           */
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

export function mapOperateurDbRowToAuthenticated(
  row: OperateurDbRow,
  clientIds: string[]
): AuthenticatedOperateur {
  return {
    operId: row.oper_id,
    email: row.oper_email,
    nom: row.oper_nom,
    prenom: row.oper_prenom,
    isAdminSys: row.oper_admin_sys,
    isActif: row.oper_actif,
    mustChangePassword: row.must_change_pwd,
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

