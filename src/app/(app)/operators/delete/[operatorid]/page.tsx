import { deleteOperatorAction } from "./server-actions";
import { Button } from "@/components/ui/button";

interface DeleteOperatorPageProps {
  params: Promise<{ id: string }>;
}

export default async function DeleteOperatorPage({
  params,
}: DeleteOperatorPageProps) {
  const { id } = await params;
  const operatorId = Number(id);

  if (Number.isNaN(operatorId)) {
    throw new Error("Invalid operator id");
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="w-full max-w-lg rounded-lg border bg-background p-6 shadow-sm space-y-6">
        <h1 className="text-xl font-semibold">
          Supprimer l’opérateur
        </h1>

        <p className="text-sm text-muted-foreground">
          Cette action est irréversible. Voulez-vous continuer ?
        </p>

        <form action={deleteOperatorAction}>
          <input
            type="hidden"
            name="operatorId"
            value={operatorId}
          />

          <div className="flex justify-end gap-3">
            <Button variant="destructive" type="submit">
              Supprimer
            </Button>

            <Button asChild variant="secondary">
              <a href="/operators">Annuler</a>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
