// src/app/(app)/operators/operatorList/OperatorDeleteDialog.tsx
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { OperatorListItem } from "@/domain/operator/operator.interface";
import { deleteOperatorAction } from "@/app/(app)/operators/delete/[id]/server-actions"; // à ajuster selon ton organisation

interface OperatorDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  operator: OperatorListItem;
}

export function OperatorDeleteDialog({ open, onOpenChange, operator }: OperatorDeleteDialogProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if (!open) return null;

  const handleConfirm = () => {
    startTransition(async () => {
      await deleteOperatorAction(operator.id);
      onOpenChange(false);
      router.refresh();
    });
  };

  return (
    <div className="dialog-backdrop">
      <div className="dialog">
        <h2>Supprimer l&apos;opérateur</h2>
        <p>Confirmez-vous la suppression de {operator.lastName} {operator.firstName} ({operator.email}) ?</p>
        <div className="flex gap-2 justify-end mt-4">
          <button onClick={() => onOpenChange(false)} disabled={isPending}>
            Annuler
          </button>
          <button className="btn btn-danger" onClick={handleConfirm} disabled={isPending}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
