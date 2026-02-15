

// src/domain/exercice/exercice-types.ts

/* ------------------------------------------------------------------ */
/* View model (projection UI)                                         */
/* ------------------------------------------------------------------ */
export interface ExerciceView {
  id: string;

  clientId: string;
  clientNom: string | null;

  code: string;

  debut: string; // YYYY-MM-DD (ou ISO)
  fin: string;   // YYYY-MM-DD (ou ISO)

  actif: boolean;
  commentaires: string | null;
  lmod: string;
}
