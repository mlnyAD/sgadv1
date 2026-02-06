


import { listAllOperateursAdmin } from "@/domain/operateur/operateur.admin.repository";
import { listAllClientsAdmin } from "@/domain/client/client.admin.repository";
import { OperClientCreateForm } from "@/ui/operclient/create/OperClientCreateForm";

export default async function OperClientCreatePage() {
  const operateurs = await listAllOperateursAdmin();
  const clients = await listAllClientsAdmin();

  return (
    <OperClientCreateForm
      operateurs={operateurs}
      clients={clients}
    />
  );
}
