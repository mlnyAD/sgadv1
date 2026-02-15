

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { GenericListTable } from "@/components/table/GenericListTable";
import type { CentreCoutView } from "@/domain/centre-cout/centre-cout-types";
import { getCentreCoutColumns } from "@/ui/centre-cout/list/CentreCoutColumns";
import { CentreCoutSelectableColumns } from "@/ui/centre-cout/list/CentreCoutSelectableColumns";
import { CentreCoutFiltersClient } from "@/ui/centre-cout/list/CentreCoutFiltersClient";


interface CentreCoutListProps {
	centreCouts: CentreCoutView[];
	page: number;
	pageSize: number;
	totalPages: number;
}

export function CentreCoutList({
	centreCouts,
	page,
	pageSize,
	totalPages,
}: CentreCoutListProps) {

	const router = useRouter();
	const searchParams = useSearchParams();

	console.log("CENTRE COUT ROW", centreCouts);

	const actifParam = searchParams.get("actif");
	const actifFilter =
		actifParam === null
			? null
			: actifParam === "true";

	const [visibleColumns] = useState(CentreCoutSelectableColumns);

	const handleEdit = (centreCout: CentreCoutView) => {
		//console.log("Edit centre de coût", centreCout);
		router.push(`/centres-cout/${centreCout.id}`);
	};

	const columns = getCentreCoutColumns({
		onEdit: handleEdit,
	});

	//console.log("CentreCoutList data sample =", centreCouts?.[0]);

	return (
		<>
			<GenericListTable
				data={centreCouts}
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
					<CentreCoutFiltersClient
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
		</>
	);
}
