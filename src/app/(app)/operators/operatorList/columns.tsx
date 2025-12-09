// src/app/(app)/operators/operatorList/columns.tsx

import { ColumnDef } from "@tanstack/react-table";
import { OperatorListItem } from "@/domain/operator/operator.interface";
import { OperatorRowActions } from "./actions";

// IMPORTANT : ce fichier contient du JSX → extension .tsx OBLIGATOIRE

export const operatorColumns: ColumnDef<OperatorListItem>[] = [
  {
    accessorKey: "lastName",
    header: "Nom",
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
    accessorKey: "metierLabel",
    header: "Métier",
  },
  {
    accessorKey: "societeName",
    header: "Société",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const operator = row.original;
      return <OperatorRowActions operator={operator} />;
    },
  },
];
