

import { listClients } from "@/domain/client/client-repository";
import { CentreCoutEditor } from "@/ui/centre-cout/edit/CentreCoutEditor";

export default async function CreateCentreCoutPage() {
  const { data: clients } = await listClients({
    page: 1,
    pageSize: 1000,
    actif: true,
  });

  const clientOptions = Array.from(
    new Map(clients.map((c) => [c.id, { id: c.id, nom: c.nom }])).values()
  );

  console.log("CreateCentreCoutPage ", clientOptions)
  return <CentreCoutEditor initialCentreCout={null} clients={clientOptions} />;
}