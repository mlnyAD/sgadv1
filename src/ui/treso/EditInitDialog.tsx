

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function EditInitDialog(props: {
  open: boolean;
  onOpenChange: (v: boolean) => void;

  soldeInit: number;
  onSave: (soldeInit: number) => Promise<void>;
}) {
  const [val, setVal] = useState(String(props.soldeInit ?? 0));
  const [saving, setSaving] = useState(false);

  const onOpenChange = (v: boolean) => {
    if (v) setVal(String(props.soldeInit ?? 0));
    props.onOpenChange(v);
  };

  return (
    <Dialog open={props.open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report n-1</DialogTitle>
          <DialogDescription>Solde de départ (début d’exercice).</DialogDescription>
        </DialogHeader>

        <div>
          <div className="text-sm text-muted-foreground">Solde initial</div>
          <Input inputMode="decimal" value={val} onChange={(e) => setVal(e.target.value)} />
        </div>

        <DialogFooter>
          <Button
            onClick={async () => {
              setSaving(true);
              try {
                const n = Number(String(val).replace(",", ".")) || 0;
                await props.onSave(n);
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