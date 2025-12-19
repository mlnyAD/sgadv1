"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GenericListTable } from "@/components/table/GenericListTable";
import { operatorColumns } from "./columns";
import { OperatorListItem } from "@/domain/operator/operator.dto";
import { OperatorsFilters } from "./OperatorsFilters";
import type { ColumnSelectorItem } from "@/components/table/ColumnSelector";
import { USER_ROLES } from "@/domain/user/roles/user-role.enum";


/* ------------------------------------------------------------------ */
/* Props */
/* ------------------------------------------------------------------ */

interface OperatorsTableProps {
  data: OperatorListItem[];
  page: number;
  pageSize: number;
  totalPages: number;
}
const selectableColumns: ColumnSelectorItem[] = [
  { key: "id", label: "ID", visible: false },
  { key: "lastName", label: "Nom", visible: true },
  { key: "firstName", label: "Prénom", visible: true },
  { key: "email", label: "Email", visible: true },
  { key: "roleLabel", label: "Rôle", visible: true },
  { key: "metierLabel", label: "Métier", visible: true },
  { key: "active", label: "Statut", visible: true },
  // ne pas inclure "actions" (toujours visible)
];

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export function OperatorsTable({
  data,
  page,
  pageSize,
  totalPages,
}: OperatorsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ------------------------------------------------------------------
     Filtres — lecture URL → état UI
     ------------------------------------------------------------------ */

  const filters = {
    search: searchParams.get("search") ?? "",
    roleId: searchParams.get("roleId")
      ? Number(searchParams.get("roleId"))
      : null,
    active:
      searchParams.get("active") === null
        ? null
        : searchParams.get("active") === "true",
  };

const roleOptions = Object.values(USER_ROLES).map((role) => ({
  id: role.id,
  label: role.label,
}));
  /* ------------------------------------------------------------------
     Filtres — écriture état UI → URL
     ------------------------------------------------------------------ */

  function onFiltersChange(next: typeof filters) {
    const params = new URLSearchParams(searchParams.toString());

    // search
    if (next.search) params.set("search", next.search);
    else params.delete("search");

    // roleId
    if (next.roleId !== null)
      params.set("roleId", String(next.roleId));
    else params.delete("roleId");

    // active
    if (next.active !== null)
      params.set("active", String(next.active));
    else params.delete("active");

    // reset pagination
    params.set("page", "1");

    router.push(`/operators?${params.toString()}`);
  }

  /* ------------------------------------------------------------------
     Pagination handlers
     ------------------------------------------------------------------ */

  function onPageChange(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    params.set("pageSize", String(pageSize));
    router.push(`/operators?${params.toString()}`);
  }

  function onPageSizeChange(size: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set("pageSize", String(size));
    router.push(`/operators?${params.toString()}`);
  }

  /* ------------------------------------------------------------------
     Render
     ------------------------------------------------------------------ */

return (
  <GenericListTable
    data={data}
    columns={operatorColumns}
    selectableColumns={selectableColumns}
    page={page}
    pageSize={pageSize}
    totalPages={totalPages}
    onPageChange={onPageChange}
    onPageSizeChange={onPageSizeChange}
    filtersSlot={
      <OperatorsFilters
        initial={filters}
        roles={roleOptions}
        onChange={onFiltersChange}
      />
    }
  />
);}
