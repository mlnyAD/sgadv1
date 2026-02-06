

// src/domain/operateur/operateur-types.ts

export interface OperateurDbRow {
  oper_id: string;
  oper_email: string;

  oper_nom: string | null;
  oper_prenom: string | null;

  oper_admin_sys: boolean;
  oper_actif: boolean;
  must_change_pwd: boolean;

  lmod: string;
}

export interface OperateurView {
  id: string;
  email: string;

  nom: string | null;
  prenom: string | null;

  isAdminSys: boolean;
  actif: boolean;
  mustChangePassword: boolean;
}

export interface OperateurPersistencePayload {
  oper_nom: string;
  oper_prenom: string;
  oper_email: string;
  oper_admin_sys: boolean;
  oper_actif: boolean;
  must_change_pwd?: boolean;
}

export type OperateurSaveResult =
  | { kind: "updated" }
  | { kind: "created"; tempPassword: string };