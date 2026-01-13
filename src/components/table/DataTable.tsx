"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  VisibilityState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  columnVisibility?: VisibilityState;

  onRowClick?: (row: T) => void;
}

export function DataTable<T>({
  columns,
  data,
  columnVisibility,
  onRowClick,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Table>
      <TableHeader >
        {table.getHeaderGroups().map((group) => (
          <TableRow key={group.id}>
            {group.headers.map((header) => (
              <TableHead
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                className="cursor-pointer select-none bg-gray-200 dark:bg-gray-800
                  text-gray-900 dark:text-gray-100
                  font-semibold
                  px-4 py-3
                  border-b border-gray-300 dark:border-gray-700
                "
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {header.column.getIsSorted() === "asc" && " ▲"}
                {header.column.getIsSorted() === "desc" && " ▼"}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

<TableBody>
  {table.getRowModel().rows.map((row) => (
    <TableRow
      key={row.id}
      onClick={
        onRowClick
          ? () => onRowClick(row.original)
          : undefined
      }
      className={
        onRowClick
          ? "cursor-pointer hover:bg-muted/40"
          : undefined
      }
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          )}
        </TableCell>
      ))}
    </TableRow>
  ))}
</TableBody>
    </Table>
  );
}
