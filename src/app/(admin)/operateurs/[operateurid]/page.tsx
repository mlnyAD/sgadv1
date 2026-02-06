

// src/app/(admin)/operateurs/[operateurid]/page.tsx

import { getOperateurById } from "@/domain/operateur/operateur.repository";
import { OperateurEditTransaction } from "@/ui/operateur/edit/OperateurEditTransaction";

export default async function EditOperateurPage({
  params,
}: {
  params: Promise<{ operateurid: string }>;
}) {
  const { operateurid } = await params;

  const operateur = await getOperateurById(operateurid);

  // Si besoin: gérer le cas null -> 404
  // (ou redirect vers /operateurs)
  return <OperateurEditTransaction initialOperateur={operateur} />;
}