"use client";

import { useState } from "react";
import { deleteFromListAction } from "./actions";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)}>
        {trigger}
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer cette configuration ?</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Voulez-vous vraiment supprimer <strong>{label}</strong> ?
        </p>

        <DialogFooter className="mt-4">

          <Button
            variant="secondary"
            type="button"
            onClick={() => setOpen(false)}
            disabled={pending}
          >
            Annuler
          </Button>

          {/* LA SEULE VERSION VALIDE */}
          <form
            action={async () => {
              setPending(true);
              const res = await deleteFromListAction(id);

              if (!res.success) {
                toast.error("Erreur lors de la suppression");
              } else {
                toast.success(`Configuration "${label}" supprimée`);
              }

              setPending(false);
              setOpen(false);
            }}
          >
            <Button type="submit" variant="destructive" disabled={pending}>
              {pending ? "Suppression..." : "Supprimer"}
            </Button>
          </form>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
