import { SocieteRepository } from "@/domain/societe/societe.repository";
import { SocieteListItem } from "@/domain/societe/societe-list-item";
import { SocieteRow } from "@/domain/societe/societe.repository"; // ou équivalent

export class SocieteService {
  private repository: SocieteRepository;

  constructor() {
    this.repository = new SocieteRepository();
  }

  async list(params: {
    page: number;
    pageSize: number;
    search?: string;
  }): Promise<{
    items: SocieteListItem[];
    total: number;
  }> {
    const { data, total } = await this.repository.findPaginated(params);

    const items: SocieteListItem[] = data.map((row: SocieteRow) => ({
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

  async getById(id: number) {
    return this.repository.findById(id);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.deleteById(id);
  }
}
