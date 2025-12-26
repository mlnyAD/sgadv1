// src/app/(app)/societes/page.tsx

import { listSocietes } from "./societes.list";
import { SocietesTable } from "./SocietesTable";
import { SocietesToolbar } from "./SocietesToolbar";

interface SocietesPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
  }>;
}

export default async function SocietesPage({
  searchParams,
}: SocietesPageProps) {
  /* -------------------- Params -------------------- */

  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const pageSize = Number(params.pageSize ?? 10);
  const search = params.search;

  /* -------------------- Data -------------------- */

  const { items, total } = await listSocietes({
    page,
    pageSize,
    search,
  });
  //console.log("PAGE societe → items:", items);
  //console.log("PAGE societe → total:", total);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  /* -------------------- Render -------------------- */

  return (
    <>
      <SocietesToolbar />
      <SocietesTable
        data={items}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </>
  );
}
