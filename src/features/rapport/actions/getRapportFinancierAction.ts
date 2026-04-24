

"use server";

import { getRapportFinancierData } from "@/domain/rapport/services/getRapportFinancierData";
import type { RapportOptionKey } from "@/domain/rapport/types";

export async function getRapportFinancierAction(params: {
  clientId: string;
  clientName: string;
  exerId: string;
  exerCode: string;
  options: RapportOptionKey[];
}) {
  return getRapportFinancierData(params);
}