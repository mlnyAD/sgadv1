

// src/features/rapport/actions/exportRapportFinancierDocx.ts

"use server";

import { generateRapportDocx } from "@/domain/rapport/export/generateRapportDocx";
import { getRapportFinancierData } from "@/domain/rapport/services/getRapportFinancierData";
import type { RapportOptionKey } from "@/domain/rapport/types";

export async function exportRapportFinancierDocx(params: {
  clientId: string;
  clientName: string;
  exerId: string;
  exerCode: string;
  options: RapportOptionKey[];
}) {
  const viewModel = await getRapportFinancierData(params);

  const buffer = await generateRapportDocx(viewModel);

  return Array.from(buffer);
}