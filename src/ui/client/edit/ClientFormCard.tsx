

"use client";

import { Button } from "@/components/ui/button";
import { ClientView } from "@/domain/client/client-types";
import { ClientFormErrors } from "./ClientForm.props";

export interface ClientFormCardProps {
	initialClient?: ClientView | null;
	errors?: ClientFormErrors;

	onCancel?: () => void;
	saving?: boolean;
	children?: React.ReactNode;
}

export function ClientFormCard({
  onCancel,
  saving = false,
  children,
}: ClientFormCardProps) {
  return (
    <div className="w-full max-w-3xl rounded-lg border bg-card p-6 space-y-6">

      <div className="space-y-4">
        {children}
      </div>

      <div className="flex justify-end gap-2 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={saving}
        >
          Annuler
        </Button>

        <Button
          type="submit"
          variant="axcio"
          disabled={saving}
        >
          {saving ? "Enregistrement…" : "Enregistrer"}
        </Button>
      </div>
    </div>
  );
}