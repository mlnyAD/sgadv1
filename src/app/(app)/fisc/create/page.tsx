

// src/app/(app)/fisc/create/page.tsx

import { notFound } from "next/navigation";
import { getCurrentClient } from "@/domain/session/current-client";
import { getActiveExercicesOptions } from "@/domain/exercice/exercice-options";
import { FiscEditor } from "@/ui/fisc/edit/FiscEditor";

export default async function CreateFiscPage() {
  const { current } = await getCurrentClient();
  if (!current?.cltId) notFound();
  const cltId = current.cltId;

  const exercicesOptions = await getActiveExercicesOptions(cltId);

  return <FiscEditor initialFisc={null} exercicesOptions={exercicesOptions} />;
}