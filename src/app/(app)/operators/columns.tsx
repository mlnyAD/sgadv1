import { ColumnDef } from "@tanstack/react-table";
import { OperatorListItem } from "@/domain/operator/operator.dto";
import Link from "next/link";
import { Pencil } from "lucide-react";

export const operatorColumns: ColumnDef<OperatorListItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "lastName",
    header: "Nom",
    cell: ({ getValue }) => (
      <span className="font-medium">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "firstName",
    header: "Prénom",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "roleLabel",
    header: "Rôle",
  },
  {
    accessorKey: "metierLabel",
    header: "Métier",
    cell: ({ getValue }) => getValue<string>() ?? "—",
  },
  {
    accessorKey: "active",
    header: "Statut",
    cell: ({ getValue }) =>
      getValue<boolean>() ? "Actif" : "Inactif",
  },

  /* ------------------------------------------------------------------
     Actions
     ------------------------------------------------------------------ */
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <div className="flex items-center gap-2 justify-center">
          {/* Edit */}
          <Link
            href={`/operators/edit/${id}`}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border hover:bg-muted"
            title="Modifier"
          >
            <Pencil className="h-4 w-4" />
          </Link>

          {/* Delete en commentaires pour l'instant */}
          {/*
          <Link
            href={`/operators/delete/${id}`}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border text-destructive hover:bg-destructive/10"
            title="Supprimer"
          >
            <Trash2 className="h-4 w-4" />
          </Link>
          */}
        </div>
      );
    },
  },
];
