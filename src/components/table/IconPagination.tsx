"use client";

import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

interface IconPaginationProps {
  page: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function IconPagination({
  page,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: IconPaginationProps) {
  const disabled = "opacity-40 cursor-not-allowed";

  return (
    <div className="flex items-center justify-between p-3">

      {/* LEFT: page size selector */}
      <div className="flex items-center gap-2 text-sm">
        <span>Éléments :</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border border-ad-light text-ad-light px-2 py-1 rounded-md bg-white dark:bg-neutral-900"
        >
          {[5, 10, 20, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      </div>

      {/* RIGHT: Pagination icons */}
      <div className="flex items-center gap-2">

        {/* First page */}
        <button
          disabled={page === 1}
          onClick={() => onPageChange(1)}
          className={`p-1 rounded-md border border-ad-light text-ad-light 
                      hover:bg-ad-light hover:text-white transition
                      ${page === 1 && disabled}`}
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Prev */}
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className={`p-1 rounded-md border border-ad-light text-ad-light
                      hover:bg-ad-light hover:text-white transition
                      ${page === 1 && disabled}`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="px-3 text-sm">
          Page {page} / {totalPages}
        </span>

        {/* Next */}
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className={`p-1 rounded-md border border-ad-light text-ad-light
                      hover:bg-ad-light hover:text-white transition
                      ${page === totalPages && disabled}`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last page */}
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`p-1 rounded-md border border-ad-light text-ad-light 
                      hover:bg-ad-light hover:text-white transition
                      ${page === totalPages && disabled}`}
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
