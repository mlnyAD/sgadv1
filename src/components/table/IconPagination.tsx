"use client";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

interface IconPaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

/* ------------------------------------------------------------------ */
/* Constantes */
/* ------------------------------------------------------------------ */

const PAGE_SIZE_OPTIONS: number[] = [10, 20, 50, 100];

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export default function IconPagination({
  page,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: IconPaginationProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      {/* Page size */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Lignes par page</span>
        <select
          value={pageSize}
          onChange={(e) =>
            onPageSizeChange(Number(e.target.value))
          }
          className="h-8 rounded-md border bg-background px-2"
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-1">
        {/* First */}
        <button
          onClick={() => onPageChange(1)}
          disabled={page <= 1}
          className="h-8 w-8 rounded-md border text-base disabled:opacity-90"
          title="Première page"
        >
          {"<<"}
        </button>

        {/* Previous */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="h-8 w-8 rounded-md border text-base disabled:opacity-90"
          title="Page précédente"
        >
          {"<"}
        </button>

        <span className="mx-3 text-base font-medium">
          Page {page} / {totalPages}
        </span>

        {/* Next */}
        <button
          onClick={() => onPageChange?.(page + 1)}
          disabled={page >= totalPages || !onPageChange}
          className="h-8 w-8 rounded-md border text-base disabled:opacity-90"
          title="Page suivante"
        >
          {">"}
        </button>
        {/* Last */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page >= totalPages}
          className="h-8 w-8 rounded-md border text-base disabled:opacity-90"
          title="Dernière page"
        >
          {">>"}
        </button>
      </div>
    </div >
  );
}
