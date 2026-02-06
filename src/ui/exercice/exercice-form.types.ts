

/* ------------------------------------------------------------------ */
/* Exercice form values                                               */
/* ------------------------------------------------------------------ */

export interface ExerciceFormValues {
  cltId: string;
  code: string;

  debut: string; // YYYY-MM-DD
  fin: string;   // YYYY-MM-DD

  actif: boolean;
  commentaires?: string | null;
}
