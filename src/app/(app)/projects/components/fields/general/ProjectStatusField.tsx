

"use client";

import { ChangeEvent, useMemo } from "react";
import { z } from "zod";

import {
  PROJECT_STATUS_CATALOG,
  ProjectStatusId,
} from "@/domain/project/project.catalog";

/* ------------------------------------------------------------------
   Zod schema
   ------------------------------------------------------------------ */

/**
 * Etat du projet :
 * - champ obligatoire
 */
const schema = z
  .custom<ProjectStatusId | null>()
  .refine((v) => v !== null, {
    message: "L'état du projet est obligatoire",
  });

/* ------------------------------------------------------------------
   Props
   ------------------------------------------------------------------ */

interface Props {
  value: ProjectStatusId | null;
  onChange: (value: ProjectStatusId | null) => void;
  disabled?: boolean;
}

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export function ProjectStatusField({
  value,
  onChange,
  disabled,
}: Props) {
  // Options du select (catalogue figé)
  const options = useMemo(
    () =>
      PROJECT_STATUS_CATALOG.map((s) => ({
        id: s.id,
        label: s.label,
      })),
    []
  );

  // Validation simple (affichage uniquement)
  const parsed = schema.safeParse(value);
  const error = parsed.success ? null : parsed.error.issues[0]?.message;

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value
      ? (Number(e.target.value) as ProjectStatusId)
      : null;

    // Toujours propager la valeur
    onChange(next);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
      <label className="md:col-span-1 text-sm font-medium">
        État du projet
      </label>

      <div className="md:col-span-5">
        <select
          className="h-9 w-full rounded-md border px-3 text-sm disabled:opacity-50"
          value={value ?? ""}
          disabled={disabled}
          onChange={handleChange}
        >
          <option value="">Sélectionner…</option>

          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>

        {error && (
          <p className="mt-1 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
