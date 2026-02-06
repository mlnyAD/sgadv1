

"use client";

import type { ChangeEvent } from "react";

export interface CentreCoutFiltersProps {
	initial: {
		search: string;
		domaineId: string | null;
		actif: boolean | null;
	};
	domaines: {
		id: string;
		libelle: string;
	}[];
	onChange: (next: {
		search: string;
		domaineId: string | null;
		actif: boolean | null;
	}) => void;
}

export function CentreCoutFilters({
	initial,
	domaines,
	onChange,
}: CentreCoutFiltersProps) {

	function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
		onChange({
			...initial,
			search: e.target.value,
		});
	}

	function onDomaineChange(e: ChangeEvent<HTMLSelectElement>) {
		onChange({
			...initial,
			domaineId: e.target.value === "" ? null : e.target.value,
		});
	}

	function onActifChange(e: ChangeEvent<HTMLSelectElement>) {
		onChange({
			...initial,
			actif:
				e.target.value === ""
					? null
					: e.target.value === "true",
		});
	}

	return (
		<div className="mb-4 flex items-center gap-3">
			{/* Recherche */}
			<input
				type="text"
				placeholder="Recherche…"
				className="h-9 w-48 rounded-md border px-3 text-sm"
				value={initial.search}
				onChange={onSearchChange}
			/>

			{/* Famille / Domaine */}
			<select
				className="h-9 rounded-md border px-2 text-sm"
				value={initial.domaineId ?? ""}
				onChange={onDomaineChange}
			>
				<option value="">Toutes les familles</option>
				{domaines.map((domaine) => (
					<option key={domaine.id} value={domaine.id}>
						{domaine.libelle}
					</option>
				))}
			</select>

			{/* Actif */}
			<select
				className="h-9 rounded-md border px-2 text-sm"
				value={
					initial.actif === null
						? ""
						: initial.actif
						? "true"
						: "false"
				}
				onChange={onActifChange}
			>
				<option value="">Tous</option>
				<option value="true">Actifs</option>
				<option value="false">Inactifs</option>
			</select>
		</div>
	);
}
