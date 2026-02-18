

import { notFound } from "next/navigation";
import { getCurrentClient } from "@/domain/session/current-client";

import { listSocietesForInvoice } from "@/domain/societe/societe-repository";
import { listExerciceOptions } from "@/domain/exercice/exercice-repository";
import { listCentreCoutOptions } from "@/domain/centre-cout/centre-cout-repository";

import { toSocieteOptions, toExerciceOptions, toCentreCoutOptions } from "@/ui/invoice/invoice.options";
import { InvoicePurchaseEditor } from "@/ui/invoice/edit/InvoicePurchaseEditor";

export default async function InvoicePurchaseCreatePage() {
  const { current } = await getCurrentClient();
  if (!current?.cltId) notFound();

  const cltId = current.cltId;

  const [societes, exercices, centresCout] = await Promise.all([
    listSocietesForInvoice({ cltId, invType: 1 }),
    listExerciceOptions({ cltId, actifOnly: true }),
    listCentreCoutOptions({ cltId }),
  ]);

   return (
    <InvoicePurchaseEditor
      initialInvoice={null}
      options={{
        societes: toSocieteOptions(societes),
        exercices: toExerciceOptions(exercices),
        centresCout: toCentreCoutOptions(centresCout),
      }}
    />
  );
}