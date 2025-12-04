export interface BibltechView {
  biblId: number;
  biblNom: string;
  biblTypeDoc: number;
  biblDateCreation: string;
  biblCrit1: number;
  biblCrit2: number;
  biblCrit3: number;
  biblPath: string;

  docCrit1?: string | null;
  docCrit2?: string | null;
  docCrit3?: string | null;
  docType?: string | null;
};
