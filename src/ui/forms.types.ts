

// src/ui/forms.types.ts

/* Primitives UI (optionnel) */
export type DateISO = `${number}-${number}-${number}`;

/* ===========================
   FORMS (UI)
   =========================== */

export interface ClientForm {
  code: string;
  nom: string;
  adresse?: string | null;
  codePostal?: string | null;
  ville?: string | null;
  pays?: string | null;
  email?: string | null;
  telephone?: string | null;
  actif: boolean;
}

export interface SocieteForm {
  cltId: string;
  nom: string;
  code: string;
  adresse?: string | null;
  ville?: string | null;
  pays?: string | null;
  codePostal?: string | null;
  telephone?: string | null;
  siren?: string | null;
  client: boolean;
  fournisseur: boolean;
}

export interface CentreCoutForm {
  cltId: string;
  familleId: number; // ou union si tu la gardes
  code: string;
  libelle: string;
  actif: boolean;
  commentaires?: string | null;
}

export interface ExerciceForm {
  cltId: string;
  code: string;
  debut: DateISO;
  fin: DateISO;
  actif: boolean;
  commentaires?: string | null;
}