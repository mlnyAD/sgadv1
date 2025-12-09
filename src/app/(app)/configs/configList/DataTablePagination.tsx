"use client";

interface PaginationProps {
  page: number;          // 1-based
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
}

export default function DataTablePagination({
  page,
  pageSize,
  total,
  onChange,
}: PaginationProps) {

  const pageCount = Math.ceil(total / pageSize);

  function goto(newPage: number) {
    if (newPage < 1 || newPage > pageCount) return;
    onChange(newPage, pageSize);
  }

  function changePageSize(newSize: number) {
    onChange(1, newSize); // Retour page 1
  }

  return (
    <div className="flex items-center justify-between mt-4">

      {/* Page size */}
      <div className="flex items-center gap-2">
        <span>Afficher :</span>
        <select
          className="input"
          value={pageSize}
          onChange={(e) => changePageSize(Number(e.target.value))}
        >
          {[10, 20, 50, 100].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center gap-2">
        <button
          className="btn"
          onClick={() => goto(page - 1)}
          disabled={page <= 1}
        >
          Précédent
        </button>

        <span>
          Page {page} / {pageCount}
        </span>

        <button
          className="btn"
          onClick={() => goto(page + 1)}
          disabled={page >= pageCount}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
