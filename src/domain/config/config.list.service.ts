import { ConfigListRepository } from "./config.list.repository";

export class ConfigListService {
  private repo = new ConfigListRepository();

  async getAll() {
    return this.repo.listAll();
  }
}
