

type Props = {
  clientName: string;
  exercice: string | number;
  dateEdition: string;
};

export function RapportHeader({
  clientName,
  exercice,
  dateEdition,
}: Props) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          {clientName} - Rapport financier
        </h1>
      </div>

      <div className="mt-4 border-t pt-3 text-sm font-medium text-center">
        Exercice : {exercice}
        <span className="mx-4">•</span>
        Date d’édition : {dateEdition}
      </div>
    </div>
  );
}