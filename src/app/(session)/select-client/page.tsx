

// src/app/(session)/select-client/page.tsx

import { requireOperateur } from "@/lib/auth/require-operateur";
import { listClientsForCurrentOperateur } from "@/features/session/current-operateur-client-action";
import SelectClientList from "./select-client-list";

type AllowedRow = { clt_id: string | null; clt_nom: string | null };

function hasClientIdAndNom(c: AllowedRow): c is { clt_id: string; clt_nom: string } {
  return c.clt_id !== null && c.clt_nom !== null;
}

export default async function SelectClientPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  await requireOperateur();

  const allowed = (await listClientsForCurrentOperateur()) as AllowedRow[];

  const sp = await searchParams;
  const next = sp?.next && sp.next.startsWith("/") ? sp.next : "/dashboard";

  if (allowed.length === 0) {
    return <div className="p-6">Aucun client autorisé</div>;
  }

  return (
    <div className="mx-auto max-w-xl space-y-4 p-6">
      <h1 className="text-xl font-semibold">Choisir un client</h1>
      <p className="text-sm text-muted-foreground">
        Sélectionnez le client pour lequel vous allez travailler.
      </p>

      <SelectClientList
        next={next}
        clients={allowed
          .filter(hasClientIdAndNom)
          .map((c) => ({ id: c.clt_id, nom: c.clt_nom }))}
      />
    </div>
  );
}