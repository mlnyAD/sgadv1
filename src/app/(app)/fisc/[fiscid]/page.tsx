

// src/app/(app)/fisc/[fiscid]/page.tsx

import { notFound } from "next/navigation";
import { getCurrentClient } from "@/domain/session/current-client";
import { getFiscById } from "@/domain/fisc/fisc-repository";
import { getActiveExercicesOptions } from "@/domain/exercice/exercice-options";
import { FiscEditor } from "@/ui/fisc/edit/FiscEditor";

type Props = {
  params: Promise<{ fiscid: string }>;
};

export default async function EditFiscPage({ params }: Props) {
  const { fiscid } = await params;

  const { current } = await getCurrentClient();
  if (!current?.cltId) notFound();
  const cltId = current.cltId;

  const [initialFisc, exercicesOptions] = await Promise.all([
    getFiscById({ cltId, fiscId: fiscid }),
    getActiveExercicesOptions(cltId),
  ]);

  if (!initialFisc) notFound();

  return <FiscEditor initialFisc={initialFisc} exercicesOptions={exercicesOptions} />;
}