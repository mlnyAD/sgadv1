

import { notFound } from "next/navigation";
import { getCurrentClient } from "@/domain/session/current-client";
import { listExercices } from "@/domain/exercice/exercice-repository";
import { ExerciceToolbar } from "@/ui/exercice/list/ExerciceToolbar";
import { ExerciceList } from "@/ui/exercice/list/ExerciceList";

interface ExercicesProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
    actif?: string;
  }>;
}

export default async function ExercicesPage({ searchParams }: ExercicesProps) {
  
  const { current } = await getCurrentClient();
  if (!current?.cltId) notFound();

  const cltId = current.cltId;

  const query = await searchParams;

  const page = Number(query.page ?? "1");
  const pageSize = Number(query.pageSize ?? "10");

  const search = typeof query.search === "string" ? query.search : undefined;
  const actif = typeof query.actif === "string" ? query.actif === "true" : undefined;

  const { data, total } = await listExercices({
    cltId,
    page,
    pageSize,
    search,
    actif,
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <>
      <ExerciceToolbar />
      <ExerciceList exercices={data} page={page} pageSize={pageSize} totalPages={totalPages} />
    </>
  );
}