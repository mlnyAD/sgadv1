

import { PurchaseEditor } from "@/ui/purchase/edit/PurchaseEditor";
import { getPurchaseEditorOptions } from "@/ui/purchase/purchase.options";
import { getPurchaseById } from "@/domain/purchase/purchase-repository";
import { getCurrentClient } from "@/domain/session/current-client";

type PageProps = {
  params: Promise<{ purchaseid: string }>;
};

export default async function Page({ params }: PageProps) {

  const { purchaseid } = await params;

  const { current } = await getCurrentClient({ requireSelected: true, next: "/purchases/sales" })
  if (!current?.cltId) return <div>Aucun client sélectionné.</div>;

  const [options, initialPurchase] = await Promise.all([
    getPurchaseEditorOptions(current.cltId),
    getPurchaseById({ cltId: current.cltId, purId: purchaseid }),
  ]);

  //console.log("sales/id/edit societes ", options.societes);
  
  if (!initialPurchase) return <div>Achat introuvable.</div>;

  return <PurchaseEditor initialPurchase={initialPurchase} options={options} />;
}