import { ConfigRepository } from "./config.repository";
import { ConfigListRepository } from "./config.list.repository";

export class ConfigService {
  private repo = new ConfigRepository();
  private listRepo = new ConfigListRepository();

  listAll() {
    return this.listRepo.listAll();
  }

  findById(id: number) {
    return this.repo.findById(id);
  }

  create(input: { type: number; name: string }) {
    return this.repo.create(input);
  }

  update(id: number, input: { type: number; name: string }) {
    return this.repo.update(id, input);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
