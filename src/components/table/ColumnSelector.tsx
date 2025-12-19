"use client";

import { useState, useRef, useEffect } from "react";
import { Squares2X2Icon } from "@heroicons/react/24/outline";

export interface ColumnSelectorItem {
  key: string;
  label: string;
  visible?: boolean;
}

interface ColumnSelectorProps {
  columns: ColumnSelectorItem[];
  visibleColumns: string[];
  onChange: (newVisible: string[]) => void;
  defaultOpen?: boolean; 
}

export default function ColumnSelector({
  columns,
  visibleColumns,
  onChange,
  defaultOpen = false
}: ColumnSelectorProps) {
  const [open, setOpen] = useState(defaultOpen);

  const ref = useRef<HTMLDivElement | null>(null);

  // Fermer le popover si clic extérieur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleColumn = (colKey: string) => {
    const updated = visibleColumns.includes(colKey)
      ? visibleColumns.filter((c) => c !== colKey)
      : [...visibleColumns, colKey];

    onChange(updated);
  };

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
         className="h-9 px-3 rounded-md flex items-center gap-2 text-sm
             border border-gray-500/40 dark:border-neutral-700
             bg-gray-50 dark:bg-neutral-800
             text-gray-800 dark:text-gray-100
             hover:bg-gray-100 dark:hover:bg-neutral-700
             transition"
      >
        <Squares2X2Icon className="w-5 h-5" />
        Colonnes
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-gray-700 z-50 animate-fadeIn">
          <div className="p-2">
            {columns.map((col) => (
              <label
                key={col.key}
                className="flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700 rounded"
              >
                <input
                  type="checkbox"
                  checked={visibleColumns.includes(col.key)}
                  onChange={() => toggleColumn(col.key)}
                />
                <span>{col.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
