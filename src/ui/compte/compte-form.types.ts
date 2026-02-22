

// src/ui/compte/compte-form.types.ts

export interface CompteFormValues {
  nom: string;
  ordre: number;
  actif: boolean;
  inclusGlobal: boolean;
  societeId?: string | null;
}