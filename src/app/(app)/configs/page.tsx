// src/app/(app)/configs/page.tsx

import { loadConfigs } from "./configList/actions";
import ConfigsPageClient from "./ConfigsPageClient";

export default async function ConfigsPage() {
  const initialData = await loadConfigs({
    page: 1,
    pageSize: 10,
  });

  return <ConfigsPageClient initialData={initialData} />;
}
