"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { PaginatedConfigList } from "./actions";
import DataTablePagination from "./DataTablePagination";
import IconPagination from "@/components/table/IconPagination";

interface ConfigDataTableProps {
  data: PaginatedConfigList;
  onRefresh: (page: number, pageSize: number) => void;
  columns: any[];
}

export default function ConfigDataTable({ data, onRefresh, columns }: ConfigDataTableProps) {

  const table = useReactTable({
    data: data.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(data.total / data.pageSize),
  });

  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-neutral-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-3 text-left">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-3 text-center" colSpan={columns.length}>
                Aucune donnée
              </td>
            </tr>
          )}
        </tbody>
      </table>

 <IconPagination
  page={data.page}
  totalPages={Math.ceil(data.total / data.pageSize)}
  pageSize={data.pageSize}
  onPageChange={(newPage) => onRefresh(newPage, data.pageSize)}
  onPageSizeChange={(newSize) => onRefresh(1, newSize)}
/>



    </div>
  );
}
