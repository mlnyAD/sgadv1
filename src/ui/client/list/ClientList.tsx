

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { GenericListTable } from "@/components/table/GenericListTable";
import type { ClientView } from "@/domain/client/client-types";
import { getClientColumns } from "@/ui/client/list/ClientColumns";
import { ClientSelectableColumns } from "@/ui/client/list/ClientSelectableColumns";
import DeleteClientDialog from "@/ui/client/delete/DeleteClientDialog";
import { ClientFiltersClient } from "@/ui/client/list/ClientFiltersClient";

interface ClientListProps {
	clients: ClientView[];
	page: number;
	pageSize: number;
	totalPages: number;
}

export function ClientList({
	clients,
	page,
	pageSize,
	totalPages,
}: ClientListProps) {

	const router = useRouter();
	const searchParams = useSearchParams();

	//console.log("CLIENT ROW clients = ", clients);

	const actifParam = searchParams.get("actif");
	const actifFilter =
		actifParam === null
			? null
			: actifParam === "true";

	const [visibleColumns] = useState(ClientSelectableColumns);
	const [deleteTarget, setDeleteTarget] =
		useState<ClientView | null>(null);

	const handleEdit = (client: ClientView) => {

		//console.log("Edit client ", client)
		router.push(`/clients/${client.id}`);
	};

	const columns = getClientColumns({
		onEdit: handleEdit,
		onDelete: (client) => setDeleteTarget(client),
	});

	return (
		<>
			<GenericListTable
				data={clients}
				columns={columns}
				selectableColumns={visibleColumns}
				page={page}
				pageSize={pageSize}
				totalPages={totalPages}
				onPageChange={(nextPage) => {
					router.push(
						`?page=${nextPage}&pageSize=${pageSize}${actifParam ? `&actif=${actifParam}` : ""
						}`
					);
				}}
				onPageSizeChange={(nextPageSize) => {
					router.push(
						`?page=1&pageSize=${nextPageSize}${actifParam ? `&actif=${actifParam}` : ""
						}`
					);
				}}
				filtersSlot={
					<ClientFiltersClient
						actif={actifFilter}
						onChange={(next) => {
							const params = new URLSearchParams(searchParams.toString());

							if (next === null) {
								params.delete("actif");
							} else {
								params.set("actif", String(next));
							}

							params.set("page", "1");
							router.push(`?${params.toString()}`);
						}}
					/>
				}
			/>

			{deleteTarget && (
				<DeleteClientDialog
					open
					onOpenChange={() => setDeleteTarget(null)}
					clientId={deleteTarget.id}
					clientName={deleteTarget.nom}
					onDeleted={() => {
						setDeleteTarget(null);
						router.refresh();
					}}
				/>
			)}
		</>
	);
}
