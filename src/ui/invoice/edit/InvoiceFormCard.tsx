

"use client";

import { Button } from "@/components/ui/button";
import type { InvoiceFormErrors } from "./InvoiceForm.props";

export interface InvoiceFormCardProps {
  errors?: InvoiceFormErrors;
  onCancel?: () => void;
  saving?: boolean;
  children?: React.ReactNode;
}

export function InvoiceFormCard({
  onCancel,
  saving = false,
  children,
}: InvoiceFormCardProps) {
  
  return (
    <div className="w-full rounded-lg border bg-card p-6 space-y-6">
      <div className="space-y-4">{children}</div>

      <div className="flex justify-end gap-2 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={saving}>
          Annuler
        </Button>

        <Button type="submit" variant="axcio" disabled={saving}>
          {saving ? "Enregistrement…" : "Enregistrer"}
        </Button>
      </div>
    </div>
  );
}