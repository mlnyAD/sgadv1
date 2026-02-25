

// src/ui/fisc/fisc-form.types.ts

export interface FiscFormValues {
  exerciceId: string;          // requis
  typeId: number;              // requis
  montant: number;             // requis
  date: string;                // requis en UX (YYYY-MM-DD)
  commentaires?: string | null;
}