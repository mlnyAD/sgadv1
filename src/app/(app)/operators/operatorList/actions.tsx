// src/app/(app)/operators/operatorList/actions.tsx
"use client";

import { useRouter } from "next/navigation";
import { OperatorListItem } from "@/domain/operator/operator.interface";
import { useState } from "react";
import { OperatorDeleteDialog } from "./operatorDeleteDialog";

interface OperatorRowActionsProps {
  operator: OperatorListItem;
}

export function OperatorRowActions({ operator }: OperatorRowActionsProps) {
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState(false);

  const handleEdit = () => {
    router.push(`/operators/${operator.id}`);
  };

  const handleDelete = () => {
    setOpenDelete(true);
  };

  return (
    <>
      <div className="flex gap-2">
        <button className="btn btn-sm btn-outline" onClick={handleEdit}>
          Modifier
        </button>
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>
          Supprimer
        </button>
      </div>

      <OperatorDeleteDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        operator={operator}
      />
    </>
  );
}
