import { loadOperators } from "./server-actions";
import { OperatorsPageClient } from "./OperatorsPageClient";

export default async function OperatorsPage() {
  const initialData = await loadOperators({
    page: 1,
    pageSize: 10,
    sortBy: "last_name",
    sortDir: "asc",
  });

  return <OperatorsPageClient initialData={initialData} />;
}
