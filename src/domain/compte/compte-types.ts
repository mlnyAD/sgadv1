

// src/domain/compte/compte-types.ts

/* ------------------------------------------------------------------ */
/* View model (projection UI)                                         */
/* ------------------------------------------------------------------ */
export interface CompteView {
  id: string;

  clientId: string;
  societeId: string | null;

  nom: string;
  ordre: number;

  actif: boolean;
  inclusGlobal: boolean;

  lmod: string;
}