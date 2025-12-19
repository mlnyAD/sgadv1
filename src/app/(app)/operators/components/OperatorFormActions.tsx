"use client";


type OperatorFormActionsProps = {
  canSubmit: boolean;
  onSubmit: () => void;
  onCancel: () => void;
};

export function OperatorFormActions({
  canSubmit,
  onSubmit,
  onCancel,
}: OperatorFormActionsProps) {
  return (
    <div className="flex w-full justify-end items-center gap-2 pt-4">

	<button
        type="button"
        onClick={onCancel}
        style={{ border: "2px solid red", padding: "8px 12px" }}
      >
        Annuler
      </button>

      <button
        type="button"
        disabled={!canSubmit}
        onClick={onSubmit}
        style={{ border: "bg-red-500 2px solid blue", padding: "8px 12px" }}
      >
        Valider
      </button>
	      </div>
  );
}
