

// src/domain/societe/societe-types.ts

export interface SocieteView {
  id: string;

  cltId: string;
  cltNom: string | null;

  nom: string;
  code: string;

  adresse: string | null;
  ville: string | null;
  codePostal: string | null;
  pays: string | null;
  telephone: string | null;

  siren: string | null;

  client: boolean;
  fournisseur: boolean;

  lmod: string;
}