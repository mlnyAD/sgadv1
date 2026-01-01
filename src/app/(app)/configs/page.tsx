import { listConfigs } from "@/domain/config";
import { ConfigsTable } from "./ConfigsTable";
import { ConfigsToolbar } from "./ConfigsToolbar";

interface ConfigsPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
    configTypeId?: string;
  }>;
};
/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default async function ConfigsPage({
  searchParams,
}: ConfigsPageProps) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");
  const pageSize = Number(params.pageSize ?? "10");
  const configTypeId = params.configTypeId
    ? Number(params.configTypeId)
    : undefined;

  const search =
    typeof params.search === "string"
      ? params.search
      : undefined;

  /* ------------------------------------------------------------------
     Data
     ------------------------------------------------------------------ */

  const { data, total } = await listConfigs({
    page,
    pageSize,
    search,
    typeId: configTypeId,
  });

  const totalPages = Math.ceil(total / pageSize);

  /* ------------------------------------------------------------------
     Render
     ------------------------------------------------------------------ */

  return (
    <>
      <ConfigsToolbar />
      <ConfigsTable
        data={data}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </>
  );
}
