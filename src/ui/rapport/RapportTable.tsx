

import type { ReactNode } from "react";

type Column<T> = {
  key: keyof T | string;
  header: string;
  align?: "left" | "right" | "center";
  render?: (row: T) => ReactNode;
};

type RapportTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
};

function alignClass(align?: Column<unknown>["align"]) {
  if (align === "right") return "text-right tabular-nums";
  if (align === "center") return "text-center";
  return "text-left";
}

export function RapportTable<T extends Record<string, unknown>>({
  columns,
  rows,
}: RapportTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-md border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b bg-slate-50">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`px-3 py-2 font-semibold ${alignClass(column.align)}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b last:border-0">
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className={`px-3 py-2 align-top ${alignClass(column.align)}`}
                >
                  {column.render
                    ? column.render(row)
                    : String(row[column.key as keyof T] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}