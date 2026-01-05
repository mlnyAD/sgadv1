
"use client";

type ClientFormActionsProps = {
  canSubmit: boolean;
  onSubmit: () => void;
  onCancel: () => void;
};

export function ClientFormActions({
  canSubmit,
  onSubmit,
  onCancel,
}: ClientFormActionsProps) {
  return (
    <div className="flex w-full justify-end items-center gap-2 pt-4">
      <button
        type="button"
        onClick={onCancel}
        className="h-9 px-4 rounded-md border"
      >
        Annuler
      </button>

      <button
        type="button"
        disabled={!canSubmit}
        onClick={onSubmit}
        className="h-9 px-4 rounded-md bg-primary text-primary-foreground disabled:opacity-50"
      >
        Valider
      </button>
    </div>
  );
}
