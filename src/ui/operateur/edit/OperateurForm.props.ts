

import type { OperateurView } from "@/domain/operateur/operateur-types";
import type { OperateurFormValues } from "@/ui/operateur/operateur-form.types";

export interface OperateurFormProps {
	initialOperateur: OperateurView | null;

	errors: OperateurFormErrors;

	onChange?: (data: OperateurFormValues) => void;

}

/* ------------------------------------------------------------------ */
/* Operateur form errors                                                  */
/* ------------------------------------------------------------------ */

export interface OperateurFormErrors {
  global?: string[];
  fields?: {
	nom?: string;
	prenom?: string;
	email?: string;
isAdminSys?: string;
actif?: string;
  };
}
