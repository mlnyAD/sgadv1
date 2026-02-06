

"use client";

import { useRouter } from "next/navigation";
import type { Row } from "@tanstack/react-table";
import type { ExerciceView } from "@/domain/exercice/exercice-types";

export function ExerciceEditAction({
	row,
}: {
	row: Row<ExerciceView>;
}) {
	const router = useRouter();
	const exercice = row.original;

	return (
		<button
			type="button"
			className="text-blue-600 underline"
			onClick={() => router.push(`/exercices/${exercice.id}`)}
		>
			Éditer
		</button>
	);
}
