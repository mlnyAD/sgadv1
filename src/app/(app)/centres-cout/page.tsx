

import { notFound } from "next/navigation";
import { getCurrentClient } from "@/domain/session/current-client";
import { listCentreCouts } from "@/domain/centre-cout/centre-cout-repository";
import { CentreCoutToolbar } from "@/ui/centre-cout/list/CentreCoutToolbar";
import { CentreCoutList } from "@/ui/centre-cout/list/CentreCoutList";

interface CentreCoutsProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
    actif?: string;
  }>;
}

export default async function CentreCoutsPage({ searchParams }: CentreCoutsProps) {
  const { current } = await getCurrentClient();
  if (!current) notFound();
  if (!current.cltId) notFound();

  const cltId = current.cltId;

  const query = await searchParams;

  const page = Number(query.page ?? "1");
  const pageSize = Number(query.pageSize ?? "10");

  const search = typeof query.search === "string" ? query.search : undefined;
  const actif = typeof query.actif === "string" ? query.actif === "true" : undefined;

  const { data, total } = await listCentreCouts({
    cltId,
    page,
    pageSize,
    search,
    actif,
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <>
      <CentreCoutToolbar />
      <CentreCoutList centreCouts={data} page={page} pageSize={pageSize} totalPages={totalPages} />
    </>
  );
}