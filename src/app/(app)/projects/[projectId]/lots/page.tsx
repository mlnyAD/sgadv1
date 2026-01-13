

import { notFound } from "next/navigation";

import { listLotTravByProject } from "@/domain/lottrav/lottrav-repository";
import { LotTravToolbar } from "@/ui/lottrav/LotTravToolbar";
import { LotTravList } from "@/ui/lottrav/LotTravList";
import { LotTravFiltersClient } from "@/ui/lottrav/LotTravFiltersClient";
import { getLotTravStatusLabel, type LotTravStatusId } from "@/domain/lottrav/lottrav-status";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

interface LotsPageProps {
  params: Promise<{
    projectId: string;
  }>;
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
    statusId?: string;
  }>;
}

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default async function LotsPage({
  params,
  searchParams,
}: LotsPageProps) {
  /* -------------------- Params -------------------- */

  const { projectId } = await params;
  const query = await searchParams;

  const projectIdNum = Number(projectId);
  if (!Number.isInteger(projectIdNum)) {
    notFound();
  }

  /* -------------------- Query params -------------------- */

  const page = Number(query.page ?? "1");
  const pageSize = Number(query.pageSize ?? "10");

  const search =
    typeof query.search === "string"
      ? query.search
      : undefined;

  const statusId =
    typeof query.statusId === "string"
      ? Number(query.statusId)
      : undefined;

  /* -------------------- Data -------------------- */

  // 🔴 IMPORTANT
  // Pour l’instant, getLotTravByProject ne prend que projectId.
  // Le filtrage réel sera branché ensuite (comme listSocietes).
  const { data, total } = await listLotTravByProject({
  projectId: projectIdNum,
  page,
  pageSize,
  search,
  statusId,
});

const totalPages = Math.max(
  1,
  Math.ceil(total / pageSize)
);

  /* -------------------- Status options -------------------- */

  const statusOptions = (
  [1, 2, 3, 4, 5, 6] as LotTravStatusId[]
).map((id) => ({
  id,
  label: getLotTravStatusLabel(id),
}));

  /* -------------------- Render -------------------- */

  return (
    <>
      {/* Header + actions */}
      <LotTravToolbar projectId={projectIdNum} />

      {/* Recherche + filtres */}
      <LotTravFiltersClient statuses={statusOptions} />

   

      {/* Liste */}
<LotTravList
  projectId={projectIdNum}
  lots={data}
  page={page}
  pageSize={pageSize}
  totalPages={totalPages}
/>
    </>
  );
}
