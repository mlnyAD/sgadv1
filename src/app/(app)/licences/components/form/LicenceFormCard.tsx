"use client";

import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/* Props */
/* ------------------------------------------------------------------ */

export interface LicenceFormCardProps {
  onCancel: () => void;
  saving?: boolean;
  children: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export function LicenceFormCard({
  onCancel,
  saving,
  children,
}: LicenceFormCardProps) {
  return (
    <div className="w-full max-w-3xl rounded-lg border bg-card p-6 space-y-6">
      
      {/* Contenu du formulaire */}
      <div className="space-y-4">
        {children}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-6 border-t">
        <Button
          variant="outline"
          type="button"
          onClick={onCancel}
          disabled={saving}
        >
          Annuler
        </Button>

        <Button
          variant="axcio"
          type="submit"
          disabled={saving}
        >
          {saving ? "Enregistrement…" : "Enregistrer"}
        </Button>
      </div>
    </div>
  );
}
