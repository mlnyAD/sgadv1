"use client";

import { ReactNode, useMemo, useState } from "react";
import type { ColumnDef, VisibilityState } from "@tanstack/react-table";

import { DataTable } from "@/components/table/DataTable";
import ColumnSelector, {
  ColumnSelectorItem,
} from "@/components/table/ColumnSelector";
import IconPagination from "@/components/table/IconPagination";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

export interface GenericListTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];

  /** Colonnes sélectionnables */
  selectableColumns?: ColumnSelectorItem[];

  /** Recherche / filtres */
  filterFn?: (row: T, search: string) => boolean;
  searchValue?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  filtersSlot?: ReactNode;

  /** Pagination (pilotée par le parent) */
  page: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export function GenericListTable<T>({
  data,
  columns,
  selectableColumns,

  filterFn,
  searchValue,
  showSearch = true,
  searchPlaceholder = "Recherche...",
  filtersSlot,

  page,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: GenericListTableProps<T>) {
  /* -------------------- Recherche locale (fallback) -------------------- */
  const [internalSearch, setInternalSearch] = useState("");
// Force l’utilisation exclusive du searchValue externe
// Résultat : filtrage dès le 1er caractère, exactement comme dans Configs  
 const effectiveSearch =
  searchValue !== undefined ? searchValue : internalSearch;

  const filteredData = useMemo(() => {
    if (!filterFn || !effectiveSearch) return data;
    return data.filter((row) => filterFn(row, effectiveSearch));
  }, [data, filterFn, effectiveSearch]);

  /* -------------------- Colonnes visibles -------------------- */
  const [visibleColumnKeys, setVisibleColumnKeys] = useState<string[]>(
    selectableColumns
      ? selectableColumns
          .filter((c) => c.visible !== false)
          .map((c) => c.key)
      : []
  );

  const columnVisibility: VisibilityState | undefined = useMemo(() => {
    if (!selectableColumns) return undefined;

    const visibility: VisibilityState = {};
    selectableColumns.forEach((col) => {
      visibility[col.key] = visibleColumnKeys.includes(col.key);
    });

    return visibility;
  }, [selectableColumns, visibleColumnKeys]);

  /* -------------------- Render -------------------- */

  return (
    <div className="space-y-3">
      {/* Toolbar table (recherche / filtres / colonnes) */}
      <div className="flex items-center justify-between gap-4 border-b bg-muted/40 px-3 py-2 rounded-t-md shadow-sm">
        <div className="flex items-center gap-3">
          {showSearch && filterFn && (
            <input
              type="text"
              className="h-9 w-64 rounded-md border px-3 text-sm"
              placeholder={searchPlaceholder}
              value={effectiveSearch}
              onChange={(e) => {
                if (searchValue === undefined) {
                  setInternalSearch(e.target.value);
                }
              }}
            />
          )}

          {filtersSlot}
        </div>

        {selectableColumns && (
          <ColumnSelector
            columns={selectableColumns}
            visibleColumns={visibleColumnKeys}
            onChange={setVisibleColumnKeys}
          />
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredData}
          columnVisibility={columnVisibility}
        />
      </div>

      {/* Pagination */}
      <IconPagination
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
