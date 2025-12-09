// src/domain/operator/operator.service.ts

import { Operator, OperatorListParams, PaginatedResult, OperatorListItem } from "./operator.interface";
import { OperatorRepository } from "./operator.repository";
import { USER_ROLES } from "@/domain/user/roles/user-role.enum";
import { DbConfig } from "@/domain/config/config.interface";
import { getConfigById } from "@/lib/config/config.service"; 

export class OperatorService {
  private repo: OperatorRepository;

  constructor() {
    this.repo = new OperatorRepository();
  }

  async list(params: OperatorListParams): Promise<PaginatedResult<OperatorListItem>> {
    return this.repo.findPaginated(params);
  }

  async get(id: number): Promise<Operator | null> {
    return this.repo.findById(id);
  }

  async create(input: Omit<Operator, "id">): Promise<Operator> {
    await this.validate(input);
    return this.repo.create(input);
  }

  async update(id: number, input: Omit<Operator, "id">): Promise<Operator> {
    await this.validate(input);
    return this.repo.update(id, input);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  private async validate(input: Omit<Operator, "id">): Promise<void> {
    if (!input.email) throw new Error("Email obligatoire");
    if (!input.firstName) throw new Error("Prénom obligatoire");
    if (!input.lastName) throw new Error("Nom obligatoire");

    const roleValid = Object.values(USER_ROLES).some(r => r.id === input.roleId);
    if (!roleValid) throw new Error("Rôle invalide");

    if (input.metierId) {
      const metier = await getConfigById(input.metierId);
      if (!metier || metier.config_type !== 3) {
        throw new Error("Métier invalide");
      }
    }
  }
}
