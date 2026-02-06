

"use client";

import { useRouter } from "next/navigation";
import type { Row } from "@tanstack/react-table";
import type { CentreCoutView } from "@/domain/centre-cout/centre-cout-types";

export function CentreCoutEditAction({
	row,
}: {
	row: Row<CentreCoutView>;
}) {
	const router = useRouter();
	const centreCout = row.original;

	return (
		<button
			type="button"
			className="text-blue-600 underline"
			onClick={() => router.push(`/centres-cout/${centreCout.id}`)}
		>
			Éditer
		</button>
	);
}
