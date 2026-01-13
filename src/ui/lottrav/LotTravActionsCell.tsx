

import type { LotTravView } from "@/domain/lottrav/lottrav-view.interface";

type Props = {
  lot: LotTravView;
  onEdit: (lot: LotTravView) => void;
  onPlanning: (lot: LotTravView) => void;
};

export function LotTravActionsCell({
  lot,
  onEdit,
  onPlanning,
}: Props) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        className="text-blue-600 hover:underline"
        onClick={() => onEdit(lot)}
      >
        Modifier
      </button>

      <button
        type="button"
        className="text-gray-600 hover:underline"
        onClick={() => onPlanning(lot)}
      >
        Planning
      </button>
    </div>
  );
}
