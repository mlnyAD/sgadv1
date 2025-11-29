export type DocumentView = {
	docId: number;
	docTypeId: number;
	docType: string;
	docNom: string;
	docRedacteur: number;
	docReadacteurNom: string;
	docDateCreation: Date;
	docEtatId: number;
	docEtat: string;
	docStockage: string;
	projectId: number;
	projectIdent: string;
};