

import { InvoicePurchaseEditor } from "@/ui/invoice/edit/InvoicePurchaseEditor";
import { getInvoiceEditorOptions } from "@/ui/invoice/invoice.options";
import { getInvoicePurchaseById } from "@/domain/invoice/invoice-repository";
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
    getInvoicePurchaseById({ cltId: current.cltId, invoiceId: invoiceid }),
  ]);

  if (!initialInvoice) return <div>Achat introuvable.</div>;

  return <InvoicePurchaseEditor initialInvoice={initialInvoice} options={options} />;
}