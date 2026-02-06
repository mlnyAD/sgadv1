

// src/app/(admin)/operateurs/create/page.tsx

import { OperateurEditTransaction } from "@/ui/operateur/edit/OperateurEditTransaction";

export default function CreateOperateurPage() {
  return <OperateurEditTransaction initialOperateur={null} />;
}