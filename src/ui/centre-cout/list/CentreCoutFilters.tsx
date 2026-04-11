

"use client";

import type { ChangeEvent } from "react";
import {
	CENTRE_COUT_FAMILLES,
	type CentreCoutFamilleId,
} from "@/domain/centre-cout/centre-cout-familles.catalog";

export interface CentreCoutFiltersProps {
	search?: string;
	code?: string;
	familleId?: CentreCoutFamilleId | null;
	actif?: boolean | null;
	onChange: (next: {
		search: string;
		code: string;
		familleId: CentreCoutFamilleId | null;
		actif: boolean | null;
	}) => void;
}

export function CentreCoutFilters({
	search = "",
	code = "",
	familleId = null,
	actif = null,
	onChange,
}: CentreCoutFiltersProps) {
	function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
		onChange({
			search: e.target.value,
			code,
			familleId,
			actif,
		});
	}

	function onCodeChange(e: ChangeEvent<HTMLInputElement>) {
		onChange({
			search,
			code: e.target.value,
			familleId,
			actif,
		});
	}

	function onFamilleChange(e: ChangeEvent<HTMLSelectElement>) {
		onChange({
			search,
			code,
			familleId:
				e.target.value === ""
					? null
					: (Number(e.target.value) as CentreCoutFamilleId),
			actif,
		});
	}

	function onActifChange(e: ChangeEvent<HTMLSelectElement>) {
		onChange({
			search,
			code,
			familleId,
			actif:
				e.target.value === ""
					? null
					: e.target.value === "true",
		});
	}

	return (
		<div className="flex flex-wrap items-center gap-3">
			<label className="text-sm font-medium text-muted-foreground">Filtres</label>

			<input
				type="text"
				placeholder="Recherche..."
				className="h-9 w-44 rounded-md border px-3 text-sm"
				value={search}
				onChange={onSearchChange}
			/>

			<input
				type="text"
				placeholder="Code..."
				className="h-9 w-32 rounded-md border px-3 text-sm"
				value={code}
				onChange={onCodeChange}
			/>

			<select
				className="h-9 rounded-md border px-2 text-sm"
				value={familleId ?? ""}
				onChange={onFamilleChange}
			>
				<option value="">Toutes les familles</option>
				{CENTRE_COUT_FAMILLES.map((famille) => (
					<option key={famille.id} value={famille.id}>
						{famille.libelle}
					</option>
				))}
			</select>

			<select
				className="h-9 rounded-md border px-2 text-sm"
				value={
					actif === null
						? ""
						: actif
							? "true"
							: "false"
				}
				onChange={onActifChange}
			>
				<option value="">Tous</option>
				<option value="true">Actifs</option>
				<option value="false">Inactifs</option>
			</select>

			<button
				className="h-9 px-3 text-sm text-muted-foreground hover:underline"
				onClick={() =>
					onChange({
						search: "",
						code: "",
						familleId: null,
						actif: null,
					})
				}
			>
				Réinitialiser
			</button>
		</div>
	);
}