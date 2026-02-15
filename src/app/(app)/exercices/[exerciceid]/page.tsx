

import { notFound } from "next/navigation";
import { getCurrentClient } from "@/domain/session/current-client";
import { getExerciceById } from "@/domain/exercice/exercice-repository";
import { ExerciceEditor } from "@/ui/exercice/edit/ExerciceEditor";

type Props = {
  params: Promise<{ exerciceid: string }>;
};

export default async function EditExercicePage({ params }: Props) {
  const { exerciceid } = await params;

  const { current } = await getCurrentClient();
  if (!current?.cltId) notFound();
  const cltId = current.cltId;

  const exercice = await getExerciceById({
    cltId,
    exerciceId: exerciceid,
  });

  if (!exercice) notFound();

  return <ExerciceEditor initialExercice={exercice} />;
}