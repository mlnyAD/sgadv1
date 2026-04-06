

import { notFound } from "next/navigation";
import { getCurrentClient } from "@/domain/session/current-client";

import { listPurchases } from "@/domain/purchase/purchase-repository";
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
  const { current } = await getCurrentClient({ requireSelected: true, next: "/purchases/purchase" })
  if (!current?.cltId) notFound();

  const cltId = current.cltId;
  const query = await searchParams;

  const page = Number(query.page ?? "1");
  const pageSize = Number(query.pageSize ?? "10");

  const search = typeof query.search === "string" ? query.search : undefined;
  const exerId = typeof query.exerId === "string" ? query.exerId : undefined;
  const socId = typeof query.socId === "string" ? query.socId : undefined;
  const ccId = typeof query.ccId === "string" ? query.ccId : undefined;

  const { data, total } = await listPurchases({
    cltId,
    page,
    pageSize,
    search,
    exerId,
    socId,
    ccId,
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

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
      />
    </>
  );
}