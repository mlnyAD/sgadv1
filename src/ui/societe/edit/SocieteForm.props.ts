

import type { SocieteView } from "@/domain/societe/societe-types";
import type { SocieteFormValues } from "@/ui/societe/societe-form.types";

export interface SocieteFormProps {
	initialSociete: SocieteView | null;

	errors: SocieteFormErrors;

	onChange?: (data: SocieteFormValues) => void;

}

/* ------------------------------------------------------------------ */
/* Societe form errors                                                  */
/* ------------------------------------------------------------------ */

export interface SocieteFormErrors {
  global?: string[];
  fields?: {
	nom?: string;
	code?: string;
	adresse?: string;
	ville?: string;
	codePostal?: string;
	pays?: string;
	telephone?: string;
	siren?: string;
	client?: string;
	fournisseur?: string;
  };
}
