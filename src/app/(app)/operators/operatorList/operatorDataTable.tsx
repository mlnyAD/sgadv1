// src/app/(app)/operators/operatorList/OperatorDataTable.tsx
"use client";
/* @react-client-only */

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import { operatorColumns } from "./columns";
import { PaginatedResult, OperatorListItem } from "@/domain/operator/operator.interface";

interface OperatorDataTableProps {
  data: PaginatedResult<OperatorListItem>;
}

export function OperatorDataTable({ data }: OperatorDataTableProps) {
  const table = useReactTable({
    data: data.data,
    columns: operatorColumns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-2 py-1 text-left">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-2 py-1">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* TODO: brancher DataTablePagination comme dans configs */}
    </div>
  );
}
