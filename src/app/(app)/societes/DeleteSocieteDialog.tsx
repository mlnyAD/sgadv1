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
import { deleteSociete } from "@/domain/societe/societe.repository";


export default function DeleteSocieteDialog({
  open,
  onOpenChange,
  societeId,
  societeName,
  onDeleted,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  societeId: number;
  societeName: string;
  onDeleted: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteSociete(societeId);
        toast.success("Société supprimée");
        onDeleted?.();
      } catch {
        toast.error("Impossible de supprimer la société");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer cette société ?</DialogTitle>
        </DialogHeader>

        <p className="mt-2">
          Voulez-vous vraiment supprimer <strong>{societeName}</strong> ?
        </p>

        <DialogFooter className="mt-6">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>

          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  );
}
