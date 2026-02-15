

import { deleteOperClient } from "@/features/operclient/operclient-action";
import Link from "next/link";
import { redirect } from "next/navigation";


interface PageProps {
  params: Promise<{
    operateurid: string;
    clientid: string;
  }>;
}

export default async function DeleteOperClientPage({
  params,
}: PageProps) {
  const { operateurid, clientid } = await params;

  async function onConfirm() {
    "use server";
    await deleteOperClient({ operateurId: operateurid, clientId: clientid });
    redirect("/operclients");
  }

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-lg font-semibold">
        Supprimer l’association
      </h1>

      <p>
        Confirmez-vous la suppression de cette association
        opérateur / client ?
      </p>

      <form action={onConfirm} className="flex gap-2">
        <button
          type="submit"
          className="px-4 h-9 rounded-md bg-destructive text-white"
        >
          Supprimer
        </button>

        <Link
          href="/operclients"
          className="px-4 h-9 rounded-md border flex items-center"
        >
          Annuler
        </Link>
      </form>
    </div>
  );
}
