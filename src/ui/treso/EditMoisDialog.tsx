

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function EditMoisDialog(props: {
  open: boolean;
  onOpenChange: (v: boolean) => void;

  titre: string;
  creditsInit: number;
  debitsInit: number;

  onSave: (credits: number, debits: number) => Promise<void>;
}) {
  const [credits, setCredits] = useState(String(props.creditsInit ?? 0));
  const [debits, setDebits] = useState(String(props.debitsInit ?? 0));
  const [saving, setSaving] = useState(false);

  // reset quand on ouvre
  const onOpenChange = (v: boolean) => {
    if (v) {
      setCredits(String(props.creditsInit ?? 0));
      setDebits(String(props.debitsInit ?? 0));
    }
    props.onOpenChange(v);
  };

  return (
    <Dialog open={props.open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.titre}</DialogTitle>
          <DialogDescription>Saisir les totaux mensuels.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <div className="text-sm text-muted-foreground">Crédits</div>
            <Input inputMode="decimal" value={credits} onChange={(e) => setCredits(e.target.value)} />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Débits</div>
            <Input inputMode="decimal" value={debits} onChange={(e) => setDebits(e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={async () => {
              setSaving(true);
              try {
                const c = Number(String(credits).replace(",", ".")) || 0;
                const d = Number(String(debits).replace(",", ".")) || 0;
                await props.onSave(c, d);
                props.onOpenChange(false);
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