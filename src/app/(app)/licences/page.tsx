

import { LICENCE_STATUS_CATALOG } from "@/domain/licence";
import type { LicenceStatus } from "@/domain/licence";

import { LicencesTable } from "./LicencesTable";
import { LicencesToolbar } from "./LicencesToolbar";
import { listLicences } from "@/domain/licence/licence.repository";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

interface LicencesPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
    clientId?: string;
    status?: string;
  }>;
}

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default async function LicencesPage({
  searchParams,
}: LicencesPageProps) {
  const params = await searchParams;

  /* -------------------- Pagination -------------------- */

  const page = Number(params.page ?? "1");
  const pageSize = Number(params.pageSize ?? "10");

  /* -------------------- Filters -------------------- */

  const search =
    typeof params.search === "string"
      ? params.search
      : undefined;

  const clientId =
    typeof params.clientId === "string"
      ? params.clientId
      : undefined;

  /**
   * Normalisation du status :
   * - string venant de l’URL
   * - validé contre le catalogue
   * - sinon ignoré
   */
  const rawStatus =
    typeof params.status === "string"
      ? params.status
      : undefined;

  const status: LicenceStatus | undefined =
    rawStatus &&
    LICENCE_STATUS_CATALOG.some(
      (s) => s.id === rawStatus
    )
      ? (rawStatus as LicenceStatus)
      : undefined;

  /* ------------------------------------------------------------------
     Data
     ------------------------------------------------------------------ */

  const { data, total } = await listLicences({
    page,
    pageSize,
    search,
    clientId,
    status,
  });

  const totalPages = Math.ceil(total / pageSize);

  /* ------------------------------------------------------------------
     Render
     ------------------------------------------------------------------ */

  return (
    <>
      <LicencesToolbar />

      <LicencesTable
        data={data}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </>
  );
}
