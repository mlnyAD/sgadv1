

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCurrentClient } from "@/domain/session/current-client";

import { loadCurrentExercise } from "@/features/dashboard/exercise/currentExercise.data";
import { listExercisesForClient } from "@/features/dashboard/exercise/listExercicses.data";
import { getExerciseById } from "@/features/dashboard/exercise/getExerciseById.data";

import { chargerTresoTransactionExercice } from "@/features/treso/chargerTresoTransactionExercice";
import { TresoTransactionScreen } from "@/ui/treso/TresoTransactionScreen";

export default async function Page(props: {
  searchParams?: Promise<{ exerId?: string }>;
}) {
  const supabase = await createSupabaseServerClient();
  const { current } = await getCurrentClient();

  const cltId = current?.cltId;
  if (!cltId) throw new Error("Client courant introuvable.");

  const exercices = await listExercisesForClient(supabase, cltId);

  const sp = (await props.searchParams) ?? {};
  const exerIdParam = sp.exerId;

  const exer = exerIdParam
    ? await getExerciseById(supabase, exerIdParam)
    : await loadCurrentExercise(supabase);

  // garde-fou simple
  if ("cltId" in exer && exer.cltId && exer.cltId !== cltId) {
    throw new Error("Exercice ne correspondant pas au client courant.");
  }

  const tx = await chargerTresoTransactionExercice(supabase, cltId, {
    exerId: exer.exerId,
    exerCode: exer.exerCode ?? null,
    debut: exer.debut,
    fin: exer.fin,
  });

  return (
<TresoTransactionScreen
  cltId={cltId}
  exerId={exer.exerId}
  exercices={exercices}
  selectedExerId={exer.exerId}
  data={tx}
/>
  );
}