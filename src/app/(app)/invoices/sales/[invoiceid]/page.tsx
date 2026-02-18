

import { InvoiceSalesEditor } from "@/ui/invoice/edit/InvoiceSalesEditor";
import { getInvoiceEditorOptions } from "@/ui/invoice/invoice.options";
import { getInvoiceSalesById } from "@/domain/invoice/invoice-repository";
import { getCurrentClient } from "@/domain/session/current-client";

type PageProps = {
  params: Promise<{ invoiceid: string }>;
};

export default async function Page({ params }: PageProps) {

  const { invoiceid } = await params;

  const { current } = await getCurrentClient();
  if (!current?.cltId) return <div>Aucun client sélectionné.</div>;

  const [options, initialInvoice] = await Promise.all([
    getInvoiceEditorOptions(current.cltId),
    getInvoiceSalesById({ cltId: current.cltId, invoiceId: invoiceid }),
  ]);

  console.log("sales/id/edit societes ", options.societes);
  
  if (!initialInvoice) return <div>Vente introuvable.</div>;

  return <InvoiceSalesEditor initialInvoice={initialInvoice} options={options} />;
}