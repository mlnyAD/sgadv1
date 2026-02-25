

// src/app/(app)/fisc/page.tsx
import { notFound } from "next/navigation";
import { getCurrentClient } from "@/domain/session/current-client";
import { listFisc } from "@/domain/fisc/fisc-repository";
import { listExercices } from "@/domain/exercice/exercice-repository";
import { FiscToolbar } from "@/ui/fisc/list/FiscToolbar";
import { FiscList } from "@/ui/fisc/list/FiscList";

interface Props {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    typeId?: string;
    exerId?: string;
  }>;
}

export default async function FiscPage({ searchParams }: Props) {
  const { current } = await getCurrentClient();
  if (!current?.cltId) notFound();
  const cltId = current.cltId;

  const query = await searchParams;

  const page = Number(query.page ?? "1");
  const pageSize = Number(query.pageSize ?? "10");

  const typeId =
    typeof query.typeId === "string" && query.typeId !== ""
      ? Number(query.typeId)
      : undefined;

  const exerciceId =
    typeof query.exerId === "string" && query.exerId !== ""
      ? query.exerId
      : undefined;

  const [{ data, total }, exercicesActifs] = await Promise.all([
    listFisc({ cltId, page, pageSize, exerciceId, typeId }),
    listExercices({ cltId, page: 1, pageSize: 200, actif: true }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const exercicesOptions = exercicesActifs.data.map((e) => ({
    id: e.id,
    code: e.code,
  }));

  return (
    <>
      <FiscToolbar />
      <FiscList
        fisc={data}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        exercicesOptions={exercicesOptions}
      />
    </>
  );
}