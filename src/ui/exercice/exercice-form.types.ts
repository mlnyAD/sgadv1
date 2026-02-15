

// src/ui/exercice/exercice-form.types.ts

export interface ExerciceFormValues {
  code: string;
  debut: string; // YYYY-MM-DD
  fin: string;   // YYYY-MM-DD
  actif: boolean;
  commentaires?: string | null;
}