

import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import type { OperateurView } from "@/domain/operateur/operateur-types";

export function getOperateurColumns(options: {
  onEdit: (operateur: OperateurView) => void;
}): ColumnDef<OperateurView>[] {
  return [
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "nom",
      header: "Nom",
      cell: ({ row }) => {
        const { nom } = row.original;
        return `${nom ?? ""}`.trim() || "—";
      },
    },
    {
      id: "prenom",
      header: "Prénom",
      cell: ({ row }) => {
        const { prenom } = row.original;
        return `${prenom ?? ""}`.trim() || "—";
      },
    },
    {
      accessorKey: "isAdminSys",
      header: "Rôle",
      cell: ({ row }) =>
        row.original.isAdminSys
          ? "Administrateur système"
          : "Utilisateur",
    },
    {
      accessorKey: "actif",
      header: "Statut",
      cell: ({ row }) =>
        row.original.actif ? "Actif" : "Inactif",
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <button
            className="h-8 w-8 rounded-md border hover:bg-muted flex items-center justify-center"
            title="Modifier"
            onClick={() => options.onEdit(row.original)}
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];
}
