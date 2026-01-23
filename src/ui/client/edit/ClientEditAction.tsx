

"use client";

import { useRouter } from "next/navigation";
import type { Row } from "@tanstack/react-table";
import type { ClientView } from "@/domain/client/client-types";

export function ClientEditAction({
	row,
}: {
	row: Row<ClientView>;
}) {
	const router = useRouter();
	const client = row.original;

	return (
		<button
			type="button"
			className="text-blue-600 underline"
			onClick={() => router.push(`/clients/${client.id}`)}
		>
			Éditer
		</button>
	);
}
