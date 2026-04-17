

import { notFound } from "next/navigation";
import { getCurrentClient } from "@/domain/session/current-client";

import { listPurchases } from "@/domain/purchase/purchase-repository";
import { listExerciceOptions } from "@/domain/exercice/exercice-repository";
import { listSocietesForPurchase } from "@/domain/societe/societe-repository";
import { listCentreCoutOptions } from "@/domain/centre-cout/centre-cout-repository";

import { PurchaseToolbar } from "@/ui/purchase/list/PurchaseToolbar";
import { PurchaseList } from "@/ui/purchase/list/PurchaseList";

interface Props {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
    exerId?: string;
    socId?: string;
    ccId?: string;
  }>;
}

export default async function PurchasePage({ searchParams }: Props) {
  const { current } = await getCurrentClient({
    requireSelected: true,
    next: "/purchases/purchase",
  });

  if (!current?.cltId) notFound();

  const cltId = current.cltId;
  const query = await searchParams;

  const page = Number(query.page ?? "1");
  const pageSize = Number(query.pageSize ?? "10");

  const search = typeof query.search === "string" ? query.search : undefined;
  const exerId = typeof query.exerId === "string" ? query.exerId : undefined;
  const socId = typeof query.socId === "string" ? query.socId : undefined;
  const ccId = typeof query.ccId === "string" ? query.ccId : undefined;

  const [{ data, total }, exercices, societes, centresCout] = await Promise.all([
    listPurchases({
      cltId,
      page,
      pageSize,
      search,
      exerId,
      socId,
      ccId,
    }),
    listExerciceOptions({ cltId }),
    listSocietesForPurchase({ cltId, invType: 2 }),
    listCentreCoutOptions({ cltId }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const exerciceOptions = exercices
    .filter((item) => item.exer_id && item.exer_code)
    .map((item) => ({
      value: item.exer_id as string,
      label: item.exer_code as string,
    }));

  const societeOptions = societes
    .filter((item) => item.soc_id && item.soc_nom)
    .map((item) => ({
      value: item.soc_id as string,
      label: item.soc_nom as string,
    }));

  const centreCoutOptions = centresCout
    .filter((item) => item.cc_id)
    .map((item) => ({
      value: item.cc_id as string,
      label:
        item.cc_code && item.cc_libelle
          ? `${item.cc_code} - ${item.cc_libelle}`
          : item.cc_code ?? item.cc_libelle ?? "—",
    }));

  return (
    <>
      <PurchaseToolbar
        title="Achats"
        subtitle="Liste des factures d'achat"
        purchaseCreateHref="/purchases/create"
      />

      <PurchaseList
        items={data}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        basePath="/purchases"
        filterOptions={{
          exercices: exerciceOptions,
          societes: societeOptions,
          centresCout: centreCoutOptions,
        }}
      />
    </>
  );
}