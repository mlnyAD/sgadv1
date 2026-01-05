

import { listClients } from "@/domain/client";
import { ClientsTable } from "./ClientsTable";
import { ClientsToolbar } from "./ClientsToolbar";

interface ClientsPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
    status?: string;
  }>;
};

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default async function ClientsPage({
  searchParams,
}: ClientsPageProps) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");
  const pageSize = Number(params.pageSize ?? "10");

  const status =
    typeof params.status === "string"
      ? params.status
      : undefined;

  const search =
    typeof params.search === "string"
      ? params.search
      : undefined;

  /* ------------------------------------------------------------------
     Data
     ------------------------------------------------------------------ */

  const { data, total } = await listClients({
    page,
    pageSize,
    search,
    status,
  });

  const totalPages = Math.ceil(total / pageSize);

  /* ------------------------------------------------------------------
     Render
     ------------------------------------------------------------------ */

  return (
    <>
      <ClientsToolbar />
      <ClientsTable
        data={data}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </>
  );
}
