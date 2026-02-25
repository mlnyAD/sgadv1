

// src/domain/fisc/fisc-types.ts

export interface FiscView {
  id: string;

  clientId: string;
  clientNom: string | null;

  societeId: string | null;
  societeNom: string | null;

  exerciceId: string;
  exerciceCode: string | null;

  typeId: number;

  montant: number;

  // NOTE: en DB c’est nullable (view + table), mais en UX on va le rendre requis
  date: string | null; // YYYY-MM-DD

  commentaires: string | null;
  lmod: string; // ISO
}