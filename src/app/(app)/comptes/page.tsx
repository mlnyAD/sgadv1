

import { notFound } from "next/navigation";
import { getCurrentClient } from "@/domain/session/current-client";
import { listComptes } from "@/domain/compte/compte-repository";
import { CompteToolbar } from "@/ui/compte/list/CompteToolbar";
import { CompteList } from "@/ui/compte/list/CompteList";

interface ComptesProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
    actif?: string;
  }>;
}

export default async function ComptesPage({ searchParams }: ComptesProps) {
  const { current } = await getCurrentClient();
  if (!current?.cltId) notFound();

  const cltId = current.cltId;

  const query = await searchParams;

  const page = Number(query.page ?? "1");
  const pageSize = Number(query.pageSize ?? "10");

  const search = typeof query.search === "string" ? query.search : undefined;
  const actif = typeof query.actif === "string" ? query.actif === "true" : undefined;

  const { data, total } = await listComptes({
    cltId,
    page,
    pageSize,
    search,
    actif,
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <>
      <CompteToolbar />
      <CompteList comptes={data} page={page} pageSize={pageSize} totalPages={totalPages} />
    </>
  );
}