

import { notFound } from "next/navigation";

import { listLotTravByProject } from "@/domain/lottrav/lottrav-repository";
import { LotTravToolbar } from "@/ui/lottrav/list/LotTravToolbar";
import { LotTravList } from "@/ui/lottrav/list/LotTravList";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface LotsPageProps {
  params: Promise<{
    projectid: string;
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

  const { projectid } = await params;
  const query = await searchParams;

  const projectIdNum = Number(projectid);
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


  /* -------------------- Render -------------------- */

  return (
    <>
      {/* Header + actions */}
      <LotTravToolbar projectid={projectIdNum} />


   

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
