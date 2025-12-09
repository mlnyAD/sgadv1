// src/app/(app)/operators/[id]/page.tsx

import { loadOperator } from "./server-actions";
import { loadMetiers } from "./config-actions";
import { OperatorForm } from "./OperatorForm";

interface PageProps {
  params: Promise<{ id: string }>;  // ← corrige "params est un Promise"
}

export default async function OperatorFormPage({ params }: PageProps) {
  // Next.js 14 / React 19 : params est un Promise → il faut await
  const { id } = await params;

  const isNew = id === "new";

  // Charger l'opérateur si édition
  const operator = isNew ? null : await loadOperator(Number(id));

  // Charger la liste des métiers (config_type = 3)
  const metiers = await loadMetiers();

  return (
    <OperatorForm
      initialData={operator}
      metiers={metiers}
      isNew={isNew}
    />
  );
}
