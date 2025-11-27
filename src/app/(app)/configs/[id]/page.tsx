import { notFound } from "next/navigation";
import { getConfigById } from "@/lib/config/config.service";
import FormClientBridge from "./FormClientBridge";

export default async function ConfigEditAddPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;               // IMPORTANT
  const configId = Number(id);                     // OK

  if (isNaN(configId) || configId < 0) {
    return notFound();
  }

  // Mode création
  if (configId === 0) {
    return <FormClientBridge mode="create" initialData={null} />;
  }

  // Mode édition
  const { data, error } = await getConfigById(configId);

  if (error || !data) {
    return notFound();
  }

  return <FormClientBridge mode="edit" initialData={data} />;
}
