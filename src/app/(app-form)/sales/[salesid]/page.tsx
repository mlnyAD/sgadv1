

import { SalesEditor } from "@/ui/sales/edit/SalesEditor";
import { getSalesEditorOptions } from "@/ui/sales/sales.options";
import { getSalesById } from "@/domain/sales/sales-repository";
import { getCurrentClient } from "@/domain/session/current-client";

type PageProps = {
  params: Promise<{ salesid: string }>;
};

export default async function Page({ params }: PageProps) {

  const { salesid } = await params;

  const { current } = await getCurrentClient({ requireSelected: true, next: "/sales" })
  if (!current?.cltId) return <div>Aucun client sélectionné.</div>;

  const [options, initialSales] = await Promise.all([
    getSalesEditorOptions(current.cltId),
    getSalesById({ cltId: current.cltId, salId: salesid }),
  ]);

  //console.log("sales/id/edit societes ", options.societes);
  
  if (!initialSales) return <div>Vente introuvable.</div>;

  return <SalesEditor initialSales={initialSales} options={options} />;
}