

import { listExercices } from "@/domain/exercice/exercice-repository";
import { ExerciceToolbar } from "@/ui/exercice/list/ExerciceToolbar";
import { ExerciceList } from "@/ui/exercice/list/ExerciceList";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface ExercicesProps {
	searchParams: Promise<{
		page?: string;
		pageSize?: string;
		search?: string;
		actif?: string;
	}>;
}

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default async function ExercicesPage({
	searchParams,
}: ExercicesProps) {
	/* -------------------- Params -------------------- */

	const query = await searchParams;

	/* -------------------- Query params -------------------- */

	const page = Number(query.page ?? "1");
	const pageSize = Number(query.pageSize ?? "10");

	const search =
		typeof query.search === "string"
			? query.search
			: undefined;

const actif =
  typeof query.actif === "string"
    ? query.actif === "true"
    : undefined;


	/* -------------------- Data -------------------- */

	const { data, total } = await listExercices({
		page,
		pageSize,
		search,
		actif,
	});

	const totalPages = Math.max(
		1,
		Math.ceil(total / pageSize)
	);


	/* -------------------- Render -------------------- */

	return (
		<>
			{/* Header + actions */}
			<ExerciceToolbar />

			{/* Liste */}
			<ExerciceList
				exercices={data}
				page={page}
				pageSize={pageSize}
				totalPages={totalPages}
			/>
		</>
	);
}
