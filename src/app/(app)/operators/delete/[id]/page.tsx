import { loadOperator, deleteOperatorAction } from "./server-actions";

interface DeleteOperatorPageProps {
  params: { id: string };
}

export default async function DeleteOperatorPage({ params }: DeleteOperatorPageProps) {
  const operator = await loadOperator(Number(params.id));

  if (!operator) {
    return <div>Opérateur introuvable.</div>;
  }

  return (
    <form action={async () => await deleteOperatorAction(operator.id)}>
      <p>
        Confirmez-vous la suppression de {operator.lastName} {operator.firstName} ?
      </p>
      <button type="submit" className="btn btn-danger">Supprimer</button>
    </form>
  );
}
