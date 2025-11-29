"use client";

import { useState } from "react";

import { deleteFromListAction } from "./actions";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "sonner";

import { CancelButton } from "@/components/Buttons/CancelButton";
import { DeleteButton } from "@/components/Buttons/DeleteButton";

export default function DeleteConfigDialog({
  id,
  label,
  trigger,
}: {
  id: number;
  label: string;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    try {
      setPending(true);
      const res = await deleteFromListAction(id);

      if (!res.success) {
        toast.error("Erreur lors de la suppression");
      } else {
        toast.success(`Configuration "${label}" supprimée`);
      }
    } finally {
      setPending(false);
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Bouton déclencheur */}
      <div onClick={() => setOpen(true)}>{trigger}</div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer cette configuration ?</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Voulez-vous vraiment supprimer{" "}
          <strong className="text-red-600">{label}</strong> ?
        </p>

        <DialogFooter className="mt-4">
          <CancelButton
            label="Annuler"
            onClick={() => setOpen(false)}
            disabled={pending}
          />

          <DeleteButton
            label="Supprimer la configuration"
            loading={pending}
            onClick={handleDelete}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
