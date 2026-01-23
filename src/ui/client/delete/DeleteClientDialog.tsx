

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
import { deleteClientAction } from "@/features/client/client-actions";

interface DeleteClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: string;
  clientName: string;
  onDeleted: () => void;
}

export default function DeleteClientDialog({
  open,
  onOpenChange,
  clientId,
  clientName,
  onDeleted,
}: DeleteClientDialogProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {

        await deleteClientAction(clientId);
        toast.success("Client supprimé");
        onDeleted();
      } catch {
        toast.error("Impossible de supprimer le client");
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
          <strong>{clientName}</strong> ?
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
