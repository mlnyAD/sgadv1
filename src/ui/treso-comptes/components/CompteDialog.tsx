

"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CompteDialog(props: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  titre: string;
  initial: { nom: string; ordre: number; inclusGlobal: boolean; actif: boolean };
  onSave: (v: { nom: string; ordre: number; inclusGlobal: boolean; actif: boolean }) => Promise<void>;
}) {
  const [nom, setNom] = useState(props.initial.nom);
  const [ordre, setOrdre] = useState(String(props.initial.ordre));
  const [inclusGlobal, setInclusGlobal] = useState(props.initial.inclusGlobal);
  const [actif, setActif] = useState(props.initial.actif);
  const [saving, setSaving] = useState(false);

  const onOpenChange = (v: boolean) => {
    if (v) {
      setNom(props.initial.nom);
      setOrdre(String(props.initial.ordre));
      setInclusGlobal(props.initial.inclusGlobal);
      setActif(props.initial.actif);
    }
    props.onOpenChange(v);
  };

  return (
    <Dialog open={props.open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.titre}</DialogTitle>
          <DialogDescription>Paramètres du compte.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <div className="text-sm text-muted-foreground">Nom</div>
            <Input value={nom} onChange={(e) => setNom(e.target.value)} />
          </div>

          <div>
            <div className="text-sm text-muted-foreground">Ordre</div>
            <Input inputMode="numeric" value={ordre} onChange={(e) => setOrdre(e.target.value)} />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={inclusGlobal} onChange={(e) => setInclusGlobal(e.target.checked)} />
            Inclus dans le solde global
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={actif} onChange={(e) => setActif(e.target.checked)} />
            Compte actif
          </label>
        </div>

        <DialogFooter>
          <Button
            onClick={async () => {
              setSaving(true);
              try {
                await props.onSave({
                  nom: nom.trim() || "Compte",
                  ordre: Number(ordre) || 0,
                  inclusGlobal,
                  actif,
                });
              } finally {
                setSaving(false);
              }
            }}
            disabled={saving}
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}