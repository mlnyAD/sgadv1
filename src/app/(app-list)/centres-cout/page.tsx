

import { notFound } from "next/navigation";
import { getCurrentClient } from "@/domain/session/current-client";
import { listCentreCouts } from "@/domain/centre-cout/centre-cout-repository";
import { CentreCoutPageHeader } from "@/ui/centre-cout/list/CentreCoutPageHeader";
import { CentreCoutList } from "@/ui/centre-cout/list/CentreCoutList";

interface CentreCoutsProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
    code?: string;
    familleId?: string;
    actif?: string;
  }>;
}

export default async function CentreCoutsPage({ searchParams }: CentreCoutsProps) {
  const { current } = await getCurrentClient({
    requireSelected: true,
    next: "/centres-cout",
  });
  if (!current) notFound();
  if (!current.cltId) notFound();

  const cltId = current.cltId;
  const query = await searchParams;

  const page = Number(query.page ?? "1");
  const pageSize = Number(query.pageSize ?? "10");

  const search =
    typeof query.search === "string" && query.search.trim() !== ""
      ? query.search.trim()
      : undefined;

  const code =
    typeof query.code === "string" && query.code.trim() !== ""
      ? query.code.trim()
      : undefined;

  const familleId =
    typeof query.familleId === "string" && query.familleId !== ""
      ? Number(query.familleId)
      : undefined;

  const actif =
    typeof query.actif === "string"
      ? query.actif === ""
        ? null
        : query.actif === "true"
      : undefined;

  const { data, total } = await listCentreCouts({
    cltId,
    page,
    pageSize,
    search,
    code,
    familleId,
    actif,
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

return (
  <div className="space-y-6">
    <CentreCoutPageHeader />

    <div className="rounded-lg border bg-background">
      <CentreCoutList
        centreCouts={data}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </div>
  </div>
);}