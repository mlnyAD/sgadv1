"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ConfigType } from "@/utils/types";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import DeleteConfigDialog from "./DeleteConfigDialog";
import { Button } from "@/components/ui/button";


export const columns: ColumnDef<ConfigType>[] = [
  {
    accessorKey: "configid",
    header: "ID",
  },
  {
    accessorKey: "confignom",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Nom <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "configtypenom",
    header: "Type",
  },
  {
    id: "edit",
    header: "",
    cell: ({ row }) => {
      const cfg = row.original;
      return (
        <Link href={`/configs/${cfg.configid}`} className="text-blue-600">
          <Pencil className="h-5 w-5" />
        </Link>
      );
    },
  },
  {
     id: "delete",
      header: "",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <DeleteConfigDialog
            id={item.configid}
            label={item.confignom}
            trigger={
              <Button variant="ghost" size="icon">
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            }
          />
        );
      },
    }
];
