

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteLotTravAction } from "@/features/lottrav/lottrav.actions";

interface DeleteLotTravDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lotId: number;
  lotName: string;
  onDeleted: () => void;
}

export default function DeleteLotTravDialog({
  open,
  onOpenChange,
  lotId,
  lotName,
  onDeleted,
}: DeleteLotTravDialogProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteLotTravAction(lotId);
        toast.success("Lot supprimé");
        onDeleted();
      } catch {
        toast.error("Impossible de supprimer le lot");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer ce lot ?</DialogTitle>
        </DialogHeader>

        <p className="mt-2">
          Voulez-vous vraiment supprimer{" "}
          <strong>{lotName}</strong> ?
        </p>

        <DialogFooter className="mt-6">
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
