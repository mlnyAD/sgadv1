import { SocieteDbRow } from "./societe.db";
import type { Societe } from "./societe.model";


// sens BD (view) -> Appli UI 
export function mapSocieteDbToModel(row: SocieteDbRow): Societe {
  return {
    id: row.societe_id!,
    nom: row.societe_nom!,
    adresse1: row.societe_adresse1 ?? "",
    adresse2: row.societe_adresse2 ?? "",
    adresse3: row.societe_adresse3 ?? "",
    ville: row.societe_ville!,
    codePostal: row.societe_code_postal ?? "",
  };
}

// sens appli UI -> BD (table) -- CREATION
import { CreateSocieteInput, UpdateSocieteInput } from "./societe.write";

export function mapCreateSocieteToDb(input: CreateSocieteInput, ) {
  return {
	societe_nom: input.nom,
	societe_adresse1: input.adresse1,
	societe_adresse2: input.adresse2 ?? null,
	societe_adresse3: input.adresse3 ?? null,
	societe_ville: input.ville,
	societe_code_postal: input.codePostal,
  };
}

// sens appli UI -> BD (table) -- UPDATE
export function mapUpdateSocieteToDb(input: UpdateSocieteInput) {
  return {
    ...(input.nom !== undefined && { societe_nom: input.nom }),
    ...(input.adresse1 !== undefined && { societe_adresse1: input.adresse1 }),
    ...(input.adresse2 !== undefined && {
      societe_adresse2: input.adresse2 || null
    }),
    ...(input.adresse3 !== undefined && {
      societe_adresse3: input.adresse3 || null
    }),
    ...(input.ville !== undefined && { societe_ville: input.ville }),
    ...(input.codePostal !== undefined && {
      societe_code_postal: input.codePostal
    }),
  };
}
