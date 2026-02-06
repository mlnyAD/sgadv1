

import { listOperateurs } from "@/domain/operateur/operateur.repository";
import { OperateurToolbar } from "@/ui/operateur/list/OperateurToolbar";
import { OperateurList } from "@/ui/operateur/list/OperateurList";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface OperateursProps {
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

export default async function OperateursPage({
	searchParams,
}: OperateursProps) {
	/* -------------------- Params -------------------- */

	const query = await searchParams;

	/* -------------------- Query params -------------------- */

	const page = Number(query.page ?? "1");
	const pageSize = Number(query.pageSize ?? "10");

	const actif =
		typeof query.actif === "string"
			? query.actif === "true"
			: undefined;


	/* -------------------- Data -------------------- */

	const { data, total } = await listOperateurs({
		page,
		pageSize,
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
			<OperateurToolbar />

			{/* Liste */}
			<OperateurList
				operateurs={data}
				page={page}
				pageSize={pageSize}
				totalPages={totalPages}
			/>
		</>
	);
}
