

import { listCentreCouts } from "@/domain/centre-cout/centre-cout-repository";
import { CentreCoutToolbar } from "@/ui/centre-cout/list/CentreCoutToolbar";
import { CentreCoutList } from "@/ui/centre-cout/list/CentreCoutList";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface CentreCoutsProps {
	searchParams: Promise<{
		page?: string;
		pageSize?: string;
		search?: string;
		actif?: string;
	}>;
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default async function CentreCoutsPage({
	searchParams,
}: CentreCoutsProps) {
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

	const { data, total } = await listCentreCouts({
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
	//console.log("centrecoutPage data = ", data)
	
	return (
		<>
			{/* Header + actions */}
			<CentreCoutToolbar />

			{/* Liste */}
			<CentreCoutList
				centreCouts={data}
				page={page}
				pageSize={pageSize}
				totalPages={totalPages}
			/>
		</>
	);
}
