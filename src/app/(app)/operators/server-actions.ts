"use server";

import { OperatorListParams } from "@/domain/operator/operator.interface";
import { OperatorService } from "@/domain/operator/operator.service";

const service = new OperatorService();

export async function loadOperators(params: OperatorListParams) {
  return await service.list(params);
}
