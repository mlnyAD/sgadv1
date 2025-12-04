"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DbConfig } from "@/domain/config/config.interface";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import DeleteConfigDialog from "./DeleteConfigDialog";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<DbConfig>[] = [
  {
    accessorKey: "config_id",
    header: "ID",
    meta: { label: "Identifiant" },
  },

  {
    accessorKey: "config_nom",
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
        <Link href={`/configs/${item.config_id}`} className="text-blue-600">
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
          id={item.config_id}
          label={item.config_nom}
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
