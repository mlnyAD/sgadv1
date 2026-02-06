

import { listOperClientAssociations } from "@/domain/operclient/operclient.repository";
import { OperClientToolbar } from "@/ui/operclient/listadmin/OperClientToolbar";
import { OperClientList } from "@/ui/operclient/listadmin/OperClientList";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface OperClientPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    operateur?: string;
    client?: string;
  }>;
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default async function OperClientPage({
  searchParams,
}: OperClientPageProps) {
  /* -------------------- Params -------------------- */

  const query = await searchParams;

  const page = Number(query.page ?? "1");
  const pageSize = Number(query.pageSize ?? "10");

  const operateur =
    typeof query.operateur === "string"
      ? query.operateur
      : undefined;

  const client =
    typeof query.client === "string"
      ? query.client
      : undefined;

  /* -------------------- Data -------------------- */

  const { data, total } =
    await listOperClientAssociations({
      page,
      pageSize,
      operateur,
      client,
    });

  const totalPages = Math.max(
    1,
    Math.ceil(total / pageSize)
  );

  /* -------------------- Render -------------------- */

  return (
    <>
      <OperClientToolbar />

      <OperClientList
        associations={data}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </>
  );
}
