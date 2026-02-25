

// src/ui/fisc/edit/FiscForm.props.ts

import type { FiscView } from "@/domain/fisc/fisc-types";
import type { FiscFormValues } from "@/ui/fisc/fisc-form.types";

export interface FiscFormProps {
  initialFisc: FiscView | null;
  errors: FiscFormErrors;
  onChange?: (data: FiscFormValues) => void;
}

/* ------------------------------------------------------------------ */
/* Fisc form errors                                                    */
/* ------------------------------------------------------------------ */

export interface FiscFormErrors {
  global?: string[];
  fields?: {
    exerciceId?: string;
    typeId?: string;
    montant?: string;
    date?: string;
    commentaires?: string;
  };
}