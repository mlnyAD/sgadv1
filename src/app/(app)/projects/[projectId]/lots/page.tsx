

import { notFound } from "next/navigation";

import { listLotTravByProject } from "@/domain/lottrav/lottrav.repository";
import { LottravToolbar } from "@/features/lottrav/LottravToolbar";
import { LottravList } from "@/features/lottrav/LottravList";
import { LottravFiltersClient } from "@/features/lottrav/LottravFiltersClient";
import { getLotStatusLabel } from "@/domain/lottrav/lottrav.catalog";
import type { LotTravStatusId } from "@/domain/lottrav/lottrav.catalog";

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

console.log("PAGE DATA", data);
  /* -------------------- Status options -------------------- */

  const statusOptions = (
  [1, 2, 3, 4, 5, 6] as LotTravStatusId[]
).map((id) => ({
  id,
  label: getLotStatusLabel(id),
}));

  /* -------------------- Render -------------------- */

  return (
    <>
      {/* Header + actions */}
      <LottravToolbar projectId={projectIdNum} />

      {/* Recherche + filtres */}
      <LottravFiltersClient statuses={statusOptions} />

   

      {/* Liste */}
<LottravList
  projectId={projectIdNum}
  lots={data}
  page={page}
  pageSize={pageSize}
  totalPages={totalPages}
/>
    </>
  );
}
