

import { notFound } from "next/navigation";
import { getCurrentClient } from "@/domain/session/current-client";

import { listInvoices } from "@/domain/invoice/invoice-repository";
import { InvoiceToolbar } from "@/ui/invoice/list/InvoiceToolbar";
import { InvoiceList } from "@/ui/invoice/list/InvoiceList";

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

export default async function InvoiceSalesPage({ searchParams }: Props) {
    const { current } = await getCurrentClient();
    if (!current?.cltId) notFound();

    const cltId = current.cltId;
    const query = await searchParams;

    const page = Number(query.page ?? "1");
    const pageSize = Number(query.pageSize ?? "10");

    const search = typeof query.search === "string" ? query.search : undefined;
    const exerId = typeof query.exerId === "string" ? query.exerId : undefined;
    const socId = typeof query.socId === "string" ? query.socId : undefined;
    const ccId = typeof query.ccId === "string" ? query.ccId : undefined;

    const { data, total } = await listInvoices({
        cltId,
        invType: 1,
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
            <InvoiceToolbar
                title="Ventes"
                subtitle="Liste des factures de vente"
                salesCreateHref="/invoices/sales/create"
                purchaseCreateHref="/invoices/purchase/create"
            />

            <InvoiceList
                items={data}
                page={page}
                pageSize={pageSize}
                totalPages={totalPages}
                basePath="/invoices/sales"
            />
        </>
    );
}