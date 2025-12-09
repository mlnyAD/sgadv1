"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { ConfigListItem } from "@/domain/config/config.list.repository";
import RowActions from "./actions-row";

export const columns: ColumnDef<ConfigListItem>[] = [
  {
  id: "label",
  accessorKey: "label",
  header: "Nom",
  cell: ({ row }) => {
    console.log("ROW ORIGINAL =", row.original);
    return <span>{row.original.label}</span>;
  },
},

  {
    accessorKey: "configType",
    header: "Type",
    cell: ({ row }) => {
      const typeId = row.original.configType;
      // Optionnel : affichage texte lisible
      return <span>{typeId}</span>;
    },
  },
  {
  header: "Type",
  accessorKey: "typeName",
  cell: ({ row }) => (
    <span>{row.original.typeName}</span>
  ),
},

  {
    id: "actions",
    header: "",
    enableSorting: false,
    cell: ({ row }) => (
      <RowActions
        row={row.original}
        onDeleted={() => {
          // Rafraîchissement simple (remplacé plus tard par un better refresh)
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        }}
      />
    ),
  },
];
