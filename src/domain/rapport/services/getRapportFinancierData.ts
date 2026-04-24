

import { listBudgetSalesLines } from "@/domain/budget/budget-repository";
import { buildRapportSections } from "../selectors/buildRapportSections";
import { mapRapportChiffreAffaires } from "../mappers/mapRapportChiffreAffaires";
import type {
  RapportFinancierViewModel,
  RapportOptionKey,
} from "../types";
import { listBudgetPurchaseLines } from "@/domain/budget/budget-repository";
import { mapRapportAchats } from "../mappers/mapRapportAchats";
import { getRapportFactures } from "./getRapportFactures";
import { getRapportTresorerie } from "./getRapportTresorerie";
import { getRapportRemboursements } from "./getRapportRemboursements";
import { getFiscSummary } from "@/domain/fisc/fisc-summary";
import { mapRapportSyntheseFiscale } from "../mappers/mapRapportSyntheseFiscale";
import { getRapportBilanFinancier } from "./getRapportBilanFinancier";

type GetRapportFinancierDataParams = {
  clientId: string;
  clientName: string;
  exerId: string;
  exerCode: string;
  options: RapportOptionKey[];
};

function formatDateEdition(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export async function getRapportFinancierData(
  params: GetRapportFinancierDataParams,
): Promise<RapportFinancierViewModel> {

  const purchaseLines = await listBudgetPurchaseLines({
  cltId: params.clientId,
  exerid: params.exerId,
});

const achats = mapRapportAchats(purchaseLines);

const factures = await getRapportFactures({
  cltId: params.clientId,
  exerId: params.exerId,
});

  const salesLines = await listBudgetSalesLines({
    cltId: params.clientId,
    exerid: params.exerId,
  });

  const chiffreAffaires = mapRapportChiffreAffaires(salesLines);

  const tresorerie = await getRapportTresorerie({
  cltId: params.clientId,
  exerId: params.exerId,
});

const remboursements = await getRapportRemboursements({
  cltId: params.clientId,
  exerId: params.exerId,
});

const fiscSummary = await getFiscSummary({
  cltId: params.clientId,
  exerId: params.exerId,
});

const syntheseFiscale = mapRapportSyntheseFiscale(fiscSummary);

const bilanFinancier = params.options.includes("bilanFinancier")
  ? await getRapportBilanFinancier({
      cltId: params.clientId,
      exerId: params.exerId,
    })
  : null;

  return {
    clientName: params.clientName,
    dateEdition: formatDateEdition(new Date()),
    exercice: params.exerCode,
    sections: buildRapportSections(
      {
        exerId: params.exerId,
        exerCode: params.exerCode,
        options: params.options,
      },
      {
        chiffreAffaires,
        factures,
        achats,
        tresorerie,
        remboursements,
        syntheseFiscale,
        bilanFinancier,
        detailBudget: null,
      },
    ),
  };
}