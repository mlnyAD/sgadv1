

type Props = {
  onExportDocx: () => void;
};

export function RapportToolbar({ onExportDocx }: Props) {
  return (
    <div className="flex items-center justify-end">
      <button
        type="button"
        onClick={onExportDocx}
        className="rounded-md border px-4 py-2 text-sm font-medium"
      >
        Exporter DOCX
      </button>
    </div>
  );
}