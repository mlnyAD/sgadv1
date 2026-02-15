

// src/ui/societe/societe-form.types.ts
export interface SocieteFormValues {
	nom: string;
	code: string;
	adresse?: string | null;
	ville?: string | null;
	codePostal?: string | null;
	pays?: string | null;
	telephone?: string | null;
	siren?: string | null;
	client: boolean;
	fournisseur: boolean;
}