

import { listClients } from "@/domain/client/client-repository";
import { ClientToolbar } from "@/ui/client/list/ClientToolbar";
import { ClientList } from "@/ui/client/list/ClientList";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface ClientsProps {
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

export default async function ClientsPage({
	searchParams,
}: ClientsProps) {
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

	const { data, total } = await listClients({
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
			<ClientToolbar />

			{/* Liste */}
			<ClientList
				clients={data}
				page={page}
				pageSize={pageSize}
				totalPages={totalPages}
			/>
		</>
	);
}
