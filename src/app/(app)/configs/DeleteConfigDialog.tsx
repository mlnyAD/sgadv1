"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteConfig } from "@/lib/config/config.service";


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
  try {
    await deleteConfig(configId);
    toast.success("Configuration supprimée");
    onDeleted?.();
  } catch {
    toast.error("Impossible de supprimer la configuration");
  }
});
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
 <DialogContent>
  <DialogHeader>
    <DialogTitle>Supprimer cette configuration ?</DialogTitle>
  </DialogHeader>

  <p className="mt-2">
    Voulez-vous vraiment supprimer <strong>{configName}</strong> ?
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
