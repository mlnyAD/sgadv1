

import type { CompteView } from "@/domain/compte/compte-types";
import type { CompteFormValues } from "@/ui/compte/compte-form.types";

export interface CompteFormProps {
  initialCompte: CompteView | null;
  errors: CompteFormErrors;
  onChange?: (data: CompteFormValues) => void;
}

/* ------------------------------------------------------------------ */
/* Compte form errors                                                  */
/* ------------------------------------------------------------------ */

export interface CompteFormErrors {
  global?: string[];
  fields?: {
    nom?: string;
    ordre?: string;
    actif?: string;
    inclusGlobal?: string;
    societeId?: string;
  };
}