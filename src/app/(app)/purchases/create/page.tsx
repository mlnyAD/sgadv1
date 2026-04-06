

import { notFound } from "next/navigation";
import { getCurrentClient } from "@/domain/session/current-client";

import { listSocietesForPurchase } from "@/domain/societe/societe-repository";
import { listExerciceOptions } from "@/domain/exercice/exercice-repository";
import { listCentreCoutOptions } from "@/domain/centre-cout/centre-cout-repository";

import { toSocieteOptions, toExerciceOptions, toCentreCoutOptions } from "@/ui/purchase/purchase.options";
import { PurchaseEditor } from "@/ui/purchase/edit/PurchaseEditor";

export default async function PurchaseCreatePage() {

  //console.log("Entrée dans PurchasePurchaseCreatePage");
  const { current } = await getCurrentClient({ requireSelected: true, next: "/purchases" })
  if (!current?.cltId) notFound();

  const cltId = current.cltId;

  const [societes, exercices, centresCout] = await Promise.all([
    listSocietesForPurchase({ cltId, invType: 2 }),
    listExerciceOptions({ cltId, actifOnly: true }),
    listCentreCoutOptions({ cltId }),
  ]);

  //console.log("PurchasePurchaseCreatePage avant retour sociétés ) ", societes)

   return (
    <PurchaseEditor
      initialPurchase={null}
      options={{
        societes: toSocieteOptions(societes),
        exercices: toExerciceOptions(exercices),
        centresCout: toCentreCoutOptions(centresCout),
      }}
    />
  );
}