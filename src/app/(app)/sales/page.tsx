

import { notFound } from "next/navigation";
import { getCurrentClient } from "@/domain/session/current-client";

import { listSales } from "@/domain/sales/sales-repository";
import { listSocietesForSales } from "@/domain/societe/societe-repository";
import { listExerciceOptions } from "@/domain/exercice/exercice-repository";
import { REVENUE_TYPES } from "@/domain/revenus/revenue-types.catalog";

import { SalesToolbar } from "@/ui/sales/list/SalesToolbar";
import { SalesList } from "@/ui/sales/list/SalesList";

interface Props {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
    exerId?: string;
    socId?: string;
    revenueTypeId?: string;
    paidStatus?: string;
  }>;
}

export default async function SalesPage({ searchParams }: Props) {
  const { current } = await getCurrentClient({
    requireSelected: true,
    next: "/sales",
  });

  if (!current?.cltId) notFound();

  const cltId = current.cltId;
  const query = await searchParams;

  const page = Number(query.page ?? "1");
  const pageSize = Number(query.pageSize ?? "10");

  const search = typeof query.search === "string" ? query.search : undefined;
  const exerId = typeof query.exerId === "string" ? query.exerId : undefined;
  const socId = typeof query.socId === "string" ? query.socId : undefined;
  const revenueTypeId =
    typeof query.revenueTypeId === "string" ? query.revenueTypeId : undefined;
  const paidStatus =
    typeof query.paidStatus === "string" ? query.paidStatus : undefined;

  const [{ data, total }, societes, exercices] = await Promise.all([
    listSales({
      cltId,
      page,
      pageSize,
      search,
      exerId,
      socId,
      revenueTypeId,
      paidStatus,
    }),
    listSocietesForSales({ cltId, invType: 1 }),
    listExerciceOptions({ cltId }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const societeOptions = societes
    .filter((item) => item.soc_id && item.soc_nom)
    .map((item) => ({
      value: item.soc_id as string,
      label: item.soc_nom as string,
    }));

  const exerciceOptions = exercices
    .filter((item) => item.exer_id && item.exer_code)
    .map((item) => ({
      value: item.exer_id as string,
      label: item.exer_code as string,
    }));

  const revenueTypeOptions = REVENUE_TYPES.map((item) => ({
    value: String(item.id),
    label: item.libelle,
  }));

  return (
    <>
      <SalesToolbar
        title="Ventes"
        subtitle="Liste des factures de vente"
        salesCreateHref="/sales/create"
      />

      <SalesList
        items={data}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        basePath="/sales"
        filterOptions={{
          societes: societeOptions,
          exercices: exerciceOptions,
          revenueTypes: revenueTypeOptions,
        }}
      />
    </>
  );
}