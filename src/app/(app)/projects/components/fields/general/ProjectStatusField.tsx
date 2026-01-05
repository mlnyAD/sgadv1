

"use client";

import { ChangeEvent, useMemo } from "react";
import { z } from "zod";

import { PROJECT_STATUS_CATALOG, ProjectStatusId } from "@/domain/project/project.catalog";

export interface ProjectTypeFieldProps {
  value: ProjectStatusId | null;
  onChange: (value: ProjectStatusId | null) => void;
}

/* ------------------------------------------------------------------
   Zod: type obligatoire (doit être != null)
   ------------------------------------------------------------------ */

const ProjectTypeSchema = z
  .custom<ProjectStatusId | null>()
  .refine((v) => v !== null, {
	message: "L'état du projet est obligatoire",
  });

export function ProjectStatusField({ value, onChange }: ProjectTypeFieldProps) {
  // Options Select
  const options = useMemo(
	() =>
	  PROJECT_STATUS_CATALOG.map((t) => ({
		id: t.id,
		label: t.label,
	  })),
	[]
  );

  // Validation (affichage simple)
  const parsed = ProjectTypeSchema.safeParse(value);
  const error = parsed.success ? null : parsed.error.issues[0]?.message;

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
	const next = e.target.value ? (Number(e.target.value) as ProjectStatusId) : null;
	onChange(next);
  }

  return (
	<div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
	  <label className="md:col-span-1 text-sm font-medium">
		Etat du projet
	  </label>

	  <select
		className="md:col-span-5 h-9 w-full rounded-md border px-3 text-sm"
		value={value ?? ""}
		onChange={handleChange}
	  >
		<option value="">Sélectionner…</option>
		{options.map((t) => (
		  <option key={t.id} value={t.id}>
			{t.label}
		  </option>
		))}
	  </select>

	  {error && (
		<p className="text-sm text-destructive">
		  {error}
		</p>
	  )}
	</div>
  );
}
