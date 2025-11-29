"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ConfigType } from "@/domain/config/config.types";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import DeleteConfigDialog from "./DeleteConfigDialog";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<ConfigType>[] = [
  {
    accessorKey: "configId",
    header: "ID",
    meta: { label: "Identifiant" },
  },

  {
    accessorKey: "configNom",
    meta: { label: "Nom" },
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
    accessorKey: "configTypeNom",
    header: "Type",
    meta: { label: "Type de configuration" },
  },

  // Bouton Modifier
  {
    id: "edit",
    header: "",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <Link href={`/configs/${item.configId}`} className="text-blue-600">
          <Pencil className="h-5 w-5" />
        </Link>
      );
    },
  },

  // Bouton Supprimer
  {
    id: "delete",
    header: "",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <DeleteConfigDialog
          id={item.configId}
          label={item.configNom}
          trigger={
            <Button variant="ghost" size="icon">
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          }
        />
      );
    },
  },
];
