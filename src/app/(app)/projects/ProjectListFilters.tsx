

"use client";

import type { ChangeEvent } from "react";
import { PROJECT_STATUS_GROUPS } from "@/domain/project/project.catalog";

type StatusGroupKey = keyof typeof PROJECT_STATUS_GROUPS;

export interface ProjectListFiltersValue {
  search: string;
  statusGroups: StatusGroupKey[];
}

interface ProjectListFiltersProps {
  initial: ProjectListFiltersValue;
  onChange: (next: ProjectListFiltersValue) => void;
}

export function ProjectListFilters({
  initial,
  onChange,
}: ProjectListFiltersProps) {

  function toggleStatus(group: StatusGroupKey) {
    const nextGroups = initial.statusGroups.includes(group)
      ? initial.statusGroups.filter((g) => g !== group)
      : [...initial.statusGroups, group];

    onChange({
      ...initial,
      statusGroups: nextGroups,
    });
  }

  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    onChange({
      ...initial,
      search: e.target.value,
    });
  }

  return (
    <div className="flex items-center gap-6">
      {/* Recherche */}
      <input
        type="text"
        placeholder="Recherche projet…"
        className="h-9 w-56 rounded-md border px-3 text-sm"
        value={initial.search}
        onChange={onSearchChange}
      />

      {/* États */}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={initial.statusGroups.includes("UPCOMING")}
            onChange={() => toggleStatus("UPCOMING")}
          />
          À venir
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={initial.statusGroups.includes("ONGOING")}
            onChange={() => toggleStatus("ONGOING")}
          />
          En cours
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={initial.statusGroups.includes("DONE")}
            onChange={() => toggleStatus("DONE")}
          />
          Terminés
        </label>
      </div>
    </div>
  );
}
