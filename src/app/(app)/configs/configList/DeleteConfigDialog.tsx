"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { deleteConfigAction } from "./actions";
import { useTransition } from "react";
import { toast } from "sonner";

export default function DeleteConfigDialog({
  open,
  onOpenChange,
  configId,
  configName,
  onDeleted,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  configId: number;
  configName: string;
  onDeleted: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteConfigAction(configId);

      if (!result.success) {
        toast.error("La suppression a échoué.");
        return;
      }

      toast.success("Configuration supprimée.");
      onOpenChange(false);
      onDeleted();
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
 <DialogContent
  className="
    bg-popover text-popover-foreground
    fixed left-1/2 top-1/2
    -translate-x-1/2 -translate-y-1/2
    w-full max-w-md
    rounded-lg p-6 shadow-lg
    border border-border
    animate-fadeIn
  "
>

        <DialogHeader>
          <DialogTitle>Supprimer cette configuration ?</DialogTitle>
        </DialogHeader>

        <p className="mt-2">
          Voulez-vous vraiment supprimer{" "}
          <strong>{configName}</strong> ?
        </p>

        <DialogFooter className="mt-6">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
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
