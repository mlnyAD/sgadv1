// Pour écriture d'un article en BD
export interface CreateSocieteInput {
  nom: string;
  adresse1: string;
  adresse2: string;
  adresse3: string;
  ville: string;
  codePostal: string;
}


export interface UpdateSocieteInput {
  nom?: string;
  adresse1?: string;
  adresse2?: string;
  adresse3?: string;
  ville?: string;
  codePostal?: string;
}
