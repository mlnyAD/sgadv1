"use client";

import type { ChangeEvent } from "react";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

export interface RoleOption {
  id: number;
  label: string;
}

export interface OperatorsFiltersProps {
  initial: {
    search: string;
    roleId: number | null;
    active: boolean | null;
  };
  roles: RoleOption[];
  onChange: (next: {
    search: string;
    roleId: number | null;
    active: boolean | null;
  }) => void;
}

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export function OperatorsFilters({
  initial,
  roles,        // 👈 OBLIGATOIRE
  onChange,
}: OperatorsFiltersProps) {
  /* -------------------- Handlers -------------------- */

  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    onChange({
      ...initial,
      search: e.target.value,
    });
  }

  function onRoleChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange({
      ...initial,
      roleId: e.target.value ? Number(e.target.value) : null,
    });
  }

  function onActiveChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange({
      ...initial,
      active:
        e.target.value === ""
          ? null
          : e.target.value === "true",
    });
  }

  /* -------------------- Render -------------------- */

  return (
    <div className="flex items-center gap-3">
      {/* Recherche */}
      <input
        type="text"
        placeholder="Recherche…"
        className="h-9 w-48 rounded-md border px-3 text-sm"
        value={initial.search}
        onChange={onSearchChange}
      />

      {/* Rôle */}
      <select
        className="h-9 rounded-md border px-2 text-sm"
        value={initial.roleId ?? ""}
        onChange={onRoleChange}
      >
        <option value="">Tous les rôles</option>
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.label}
          </option>
        ))}
      </select>

      {/* Statut */}
      <select
        className="h-9 rounded-md border px-2 text-sm"
        value={
          initial.active === null
            ? ""
            : String(initial.active)
        }
        onChange={onActiveChange}
      >
        <option value="">Statut</option>
        <option value="true">Actif</option>
        <option value="false">Inactif</option>
      </select>
    </div>
  );
}
