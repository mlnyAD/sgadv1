

// src/ui/operateur/edit/OperateurEditTransaction.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { OperateurView, OperateurSaveResult } from "@/domain/operateur/operateur-types";
import { OperateurEditor } from "@/ui/operateur/edit/OperateurEditor";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function OperateurEditTransaction({ initialOperateur }: { initialOperateur: OperateurView | null }) {
  const router = useRouter();

  const [showTempPasswordDialog, setShowTempPasswordDialog] = useState(false);
  const [tempPassword, setTempPassword] = useState<string | null>(null);

  const goList = () => router.push("/operateurs");

  const onSaved = (result: OperateurSaveResult) => {
    if (result.kind === "created") {
      setTempPassword(result.tempPassword);
      setShowTempPasswordDialog(true);
      return;
    }
    goList();
  };

  const closeDialogAndGoList = () => {
    setShowTempPasswordDialog(false);
    setTempPassword(null);
    goList();
  };

  return (
    <>
      <OperateurEditor
        initialOperateur={initialOperateur}
        onCancel={() => router.back()}
        onSaved={onSaved}
      />

      <Dialog
        open={showTempPasswordDialog}
        onOpenChange={(open) => {
          setShowTempPasswordDialog(open);
          if (!open) closeDialogAndGoList();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Compte opérateur créé</DialogTitle>
            <DialogDescription>
              Copiez ce mot de passe temporaire et transmettez-le à l’opérateur.
              Il sera obligé de le changer à sa première connexion.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Input readOnly value={tempPassword ?? ""} />
            <Button
              type="button"
              onClick={async () => {
                if (!tempPassword) return;
                await navigator.clipboard.writeText(tempPassword);
              }}
            >
              Copier le mot de passe temporaire
            </Button>
          </div>

          <DialogFooter>
            <Button type="button" onClick={closeDialogAndGoList}>
              Continuer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}