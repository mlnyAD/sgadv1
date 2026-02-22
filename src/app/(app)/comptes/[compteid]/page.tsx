

import { notFound } from "next/navigation";
import { getCurrentClient } from "@/domain/session/current-client";
import { getCompteById } from "@/domain/compte/compte-repository";
import { CompteEditor } from "@/ui/compte/edit/CompteEditor";

type Props = {
  params: Promise<{ compteid: string }>;
};

export default async function EditComptePage({ params }: Props) {
  const { compteid } = await params;

  const { current } = await getCurrentClient();
  if (!current?.cltId) notFound();
  const cltId = current.cltId;

  const compte = await getCompteById({
    cltId,
    compteId: compteid,
  });

  if (!compte) notFound();

  return <CompteEditor initialCompte={compte} />;
}