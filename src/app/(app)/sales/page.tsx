

import { notFound } from "next/navigation";
import { getCurrentClient } from "@/domain/session/current-client";

import { listSales } from "@/domain/sales/sales-repository";
import { SalesToolbar } from "@/ui/sales/list/SalesToolbar";
import { SalesList } from "@/ui/sales/list/SalesList";

interface Props {
    searchParams: Promise<{
        page?: string;
        pageSize?: string;
        search?: string;
        exerId?: string;
        socId?: string;
    }>;
}

export default async function SalesPage({ searchParams }: Props) {
    
    const { current } = await getCurrentClient({ requireSelected: true, next: "/sales" })
    if (!current?.cltId) notFound();

    const cltId = current.cltId;
    const query = await searchParams;

    const page = Number(query.page ?? "1");
    const pageSize = Number(query.pageSize ?? "10");

    const search = typeof query.search === "string" ? query.search : undefined;
    const exerId = typeof query.exerId === "string" ? query.exerId : undefined;
    const socId = typeof query.socId === "string" ? query.socId : undefined;

    const { data, total } = await listSales({
        cltId,
        page,
        pageSize,
        search,
        exerId,
        socId,
    });

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

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
            />
        </>
    );
}