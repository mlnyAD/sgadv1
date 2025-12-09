import { ConfigService } from "@/domain/config/config.service";
import ConfigForm from "./ConfigForm";

interface ConfigPageProps {
  params: { id: string };
}

export default async function ConfigPage({ params }: ConfigPageProps) {
  const { id } = await params;

  const service = new ConfigService();

  const isNew = id === "new";
  const config = isNew ? null : await service.findById(Number(id));

  return <ConfigForm initialData={config} isNew={isNew} />;
}