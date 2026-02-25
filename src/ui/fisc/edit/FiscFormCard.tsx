

"use client";

import { Button } from "@/components/ui/button";
import type { FiscFormErrors } from "./FiscForm.props";

export interface FiscFormCardProps {
  errors?: FiscFormErrors;
  onCancel?: () => void;
  saving?: boolean;
  children?: React.ReactNode;

  canDelete?: boolean;
  deleting?: boolean;
  onDelete?: () => void;
}

export function FiscFormCard({
  onCancel,
  saving = false,
  children,
  canDelete = false,
  deleting = false,
  onDelete,
}: FiscFormCardProps) {
  return (
    <div className="w-full max-w-3xl rounded-lg border bg-card p-6 space-y-6">
      <div className="space-y-4">{children}</div>

      <div className="flex justify-between gap-2 pt-6 border-t">
        <div>
          {canDelete ? (
            <Button
              type="button"
              variant="destructive"
              onClick={onDelete}
              disabled={saving || deleting}
            >
              {deleting ? "Suppression…" : "Supprimer"}
            </Button>
          ) : null}
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={saving || deleting}
          >
            Annuler
          </Button>

          <Button type="submit" variant="axcio" disabled={saving || deleting}>
            {saving ? "Enregistrement…" : "Enregistrer"}
          </Button>
        </div>
      </div>
    </div>
  );
}