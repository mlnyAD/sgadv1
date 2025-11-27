export const dynamic = "force-dynamic";

import { getConfigsAll } from "@/lib/config/config.service";
import ConfigList from "./configList/ConfigList";

export default async function ConfigsPage() {
  const { data, error } = await getConfigsAll();

  if (error) {
    console.error("Erreur ConfigList :", error);
    return <div>Erreur lors du chargement des configurations.</div>;
  }

  return <ConfigList initialData={data ?? []} />;
}
