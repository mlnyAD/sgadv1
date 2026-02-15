


import { CentreCoutFamilleId } from "./centre-cout-familles.catalog";


/* ------------------------------------------------------------------ */
/* View model (projection UI)                                          */
/* ------------------------------------------------------------------ */
export interface CentreCoutView {
	id: string;
	code: string;
	libelle: string;
	clientId: string;
	clientNom?: string | null;
	familleId: CentreCoutFamilleId;
	familleLibelle?: string;
	commentaires?: string | null;
	actif: boolean;
	lmod: string;
}
