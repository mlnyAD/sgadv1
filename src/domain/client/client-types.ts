

// src/domain/client/client-types.ts

export interface ClientView {
  id: string;
  nom: string;
  code: string;
  adresse: string | null;
  codePostal: string | null;
  ville: string | null;
  pays: string | null;
  email: string | null;
  telephone: string | null;
  actif: boolean;
  lmod: string; // si tu veux l’exposer côté UI
}