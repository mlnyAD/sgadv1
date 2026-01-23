

import type { ClientView } from "@/domain/client/client-types";
import type { ClientFormValues } from "@/ui/client/client-form.types";


export interface ClientFormProps {
    initialLot: ClientView | null;

    errors: ClientFormErrors;

    onChange?: (data: ClientFormValues) => void;

}

/* ------------------------------------------------------------------ */
/* Client form errors                                                  */
/* ------------------------------------------------------------------ */

export interface ClientFormErrors {
  global?: string[];
  fields?: {
    nom?: string;
    code?: string;
    adresse?: string;
    codePostal?: string;
    ville?: string;
    pays?: string;
    email?: string;
    telephone?: string;
    actif?: string;
  };
}
