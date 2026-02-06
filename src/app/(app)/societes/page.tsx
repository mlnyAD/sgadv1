



import { listSocietes } from "@/domain/societe/societe-repository";
import { SocieteToolbar } from "@/ui/societe/list/SocieteToolbar";
import { SocieteList } from "@/ui/societe/list/SocieteList";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface SocietesProps {
	searchParams: Promise<{
		page?: string;
		pageSize?: string;
		search?: string;
		client?: boolean;
		fournisseur?: boolean;
	}>;
}

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default async function SocietesPage({
	searchParams,
}: SocietesProps) {
	/* -------------------- Params -------------------- */

	const query = await searchParams;

	/* -------------------- Query params -------------------- */

	const page = Number(query.page ?? "1");

	const pageSize = Number(query.pageSize ?? "10");

	const search =
		typeof query.search === "string"
			? query.search
			: undefined;

	const client =
		query.client == true ? query.client = true : query.client = false;

	const fournisseur =
		query.fournisseur == true ? query.fournisseur = true : query.fournisseur = false;

	/* -------------------- Data -------------------- */

	const { data, total } = await listSocietes({
		page,
		pageSize,
		search,
		client,
		fournisseur,
	});

	const totalPages = Math.max(
		1,
		Math.ceil(total / pageSize)
	);


	/* -------------------- Render -------------------- */

	return (
		<>
			{/* Header + actions */}
			<SocieteToolbar />

			{/* Liste */}
			<SocieteList
				societes={data}
				page={page}
				pageSize={pageSize}
				totalPages={totalPages}
			/>
		</>
	);
}
