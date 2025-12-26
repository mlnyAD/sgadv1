import { SocieteListItem } from "@/domain/societe/societe-list-item";
import { SocieteRepository } from "@/domain/societe/societe.repository";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

export interface ListSocietesParams {
  page: number;
  pageSize: number;
  search?: string;
}

/* ------------------------------------------------------------------ */
/* Repository */
/* ------------------------------------------------------------------ */

const repository = new SocieteRepository();

/* ------------------------------------------------------------------ */
/* Service */
/* ------------------------------------------------------------------ */

export async function listSocietes({
  page,
  pageSize,
  search,
}: ListSocietesParams): Promise<{
  items: SocieteListItem[];
  total: number;
}> {
  const { data, total } = await repository.findPaginated({
    page,
    pageSize,
    search,
  });

  const items: SocieteListItem[] = data.map((row) => ({
    id: row.societe_id,
    nom: row.societe_nom,
    adresse1: row.societe_adresse1,
    adresse2: row.societe_adresse2,
    adresse3: row.societe_adresse3,
    ville: row.societe_ville,
    codePostal: row.societe_code_postal,
  }));

  return {
    items,
    total,
  };
}
