import { listConfigs } from "@/app/(app)/configs/configs.list";
import { ConfigsTable } from "./ConfigsTable";
import { ConfigsToolbar } from "./ConfigsToolbar";

/* ------------------------------------------------------------------ */
/* Props */
/* ------------------------------------------------------------------ */

interface ConfigsPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default async function ConfigsPage({
  searchParams,
}: ConfigsPageProps) {
  /* ------------------------------------------------------------------
     Lecture et normalisation des paramètres URL
     ------------------------------------------------------------------ */

  const params = await searchParams;

  const page =
    typeof params.page === "string"
      ? Number(params.page)
      : 1;

  const pageSize =
    typeof params.pageSize === "string"
      ? Number(params.pageSize)
      : 10;

  const search =
    typeof params.search === "string"
      ? params.search
      : undefined;

  /* ------------------------------------------------------------------
     Data
     ------------------------------------------------------------------ */
  const configTypeId =
    typeof params.configTypeId === "string"
      ? Number(params.configTypeId)
      : undefined;

  const { items, totalPages } = await listConfigs({
  page,
  pageSize,
  search,
  configTypeId,
});


  await listConfigs({
    page,
    pageSize,
    search,
    configTypeId,
  });



  /* ------------------------------------------------------------------
     Render
     ------------------------------------------------------------------ */

  return (
    <>
      <ConfigsToolbar />
      <ConfigsTable
        data={items}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </>
  );
}
