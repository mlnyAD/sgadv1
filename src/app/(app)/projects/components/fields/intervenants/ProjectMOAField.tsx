

"use client";

import { useMemo, ChangeEvent } from "react";
import { Label } from "@/components/ui/label";

/* ------------------------------------------------------------------
   Types
   ------------------------------------------------------------------ */

export interface ProjectMoaOption {
  id: number;
  label: string;
}

interface ProjectMoaFieldProps {
  /** ID de la société MOA sélectionnée */
  value: number | null;

  /** Liste des sociétés disponibles */
  options: ProjectMoaOption[];

  /**
   * Libellé courant issu de la vue (optionnel).
   * Utile si la société n’est plus dans la liste.
   */
  currentLabel?: string | null;

  /** Callback métier */
  onChange: (value: number | null) => void;
}

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export function ProjectMOAField({
  value,
  options,
  currentLabel,
  onChange,
}: ProjectMoaFieldProps) {
  /* -------------------- Options effectives -------------------- */
  const effectiveOptions = useMemo(() => {
    if (
      value !== null &&
      currentLabel &&
      !options.some((o) => o.id === value)
    ) {
      return [
        { id: value, label: currentLabel },
        ...options,
      ];
    }
    return options;
  }, [value, currentLabel, options]);

  /* -------------------- Handlers -------------------- */

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value
      ? Number(e.target.value)
      : null;
    onChange(next);
  }

  /* -------------------- Render -------------------- */

  return (
    <div className="space-y-1">
      <Label htmlFor="project_moa_id">
        Maître d’ouvrage (MOA)
      </Label>

      <select
        id="project_moa_id"
        className="h-9 w-full rounded-md border px-3 text-sm"
        value={value ?? ""}
        onChange={handleChange}
      >
        <option value="">Sélectionner…</option>

        {effectiveOptions.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
