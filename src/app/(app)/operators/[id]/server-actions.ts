"use server";

import { OperatorService } from "@/domain/operator/operator.service";

const service = new OperatorService();

type OperatorFormPayload = {
  email: string;
  firstName: string;
  lastName: string;
  roleId: number;
  metierId?: number | null;
  societeId?: number | null;
  active: boolean;
};

export async function loadOperator(id: number) {
  return await service.get(id);
}

export async function createOperatorAction(payload: OperatorFormPayload) {
  await service.create({
    ...payload,
  });
}

export async function updateOperatorAction(id: number, payload: OperatorFormPayload) {
  await service.update(id, {
    ...payload,
  });
}
