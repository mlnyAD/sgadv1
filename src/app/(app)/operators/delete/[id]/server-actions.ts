"use server";

import { OperatorService } from "@/domain/operator/operator.service";

const service = new OperatorService();

export async function loadOperator(id: number) {
  return await service.get(id);
}

export async function deleteOperatorAction(id: number) {
  await service.delete(id);
}
