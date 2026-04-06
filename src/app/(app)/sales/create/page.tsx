

import { notFound } from "next/navigation";
import { getCurrentClient } from "@/domain/session/current-client";
import { SalesEditor } from "@/ui/sales/edit/SalesEditor";

import { listSocietesForSales } from "@/domain/societe/societe-repository";
import { listExerciceOptions } from "@/domain/exercice/exercice-repository";

import { toSocieteOptions, toExerciceOptions, } from "@/ui/sales/sales.options";

export default async function SalesCreatePage() {
  
  const { current } = await getCurrentClient({ requireSelected: true, next: "/sales" })
  if (!current?.cltId) notFound();

  const cltId = current.cltId;

  const [societes, exercices, ] = await Promise.all([
    listSocietesForSales({ cltId, invType: 1 }),
    listExerciceOptions({ cltId, actifOnly: true }),
  ]);

   return (
    <SalesEditor
      initialSales={null}
      options={{
        societes: toSocieteOptions(societes),
        exercices: toExerciceOptions(exercices),
      }}
    />
  );
}