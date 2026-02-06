

import type { CentreCoutView } from "@/domain/centre-cout/centre-cout-types";
import type { CentreCoutFormValues } from "@/ui/centre-cout/centre-cout-form.types";

export interface CentreCoutFormProps {
  initialCentreCout: CentreCoutView | null;

  errors: CentreCoutFormErrors;

  onChange?: (data: CentreCoutFormValues) => void;
}

/* ------------------------------------------------------------------ */
/* Centre de coût form errors                                          */
/* ------------------------------------------------------------------ */

export interface CentreCoutFormErrors {
  global?: string[];
  fields?: {
    code?: string;
    libelle?: string;
    clientId?: string;     
    familleId?: string;
    commentaires?: string;
    actif?: string;
  };
}
