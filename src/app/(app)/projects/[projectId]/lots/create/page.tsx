

import { LotTravEditor } from "@/ui/lottrav/LotTravEditor";
import { listProjectContacts } from "@/domain/lottrav/lottrav.repository";


type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function CreateLotPage({ params }: Props) {

  const { projectId } = await params;

  const projectIdNum  = Number(projectId)

  const operators  = await listProjectContacts();


  return (
    <LotTravEditor
      projectId={projectIdNum}
      initialLot={null}
	  operators={operators}
    />
  );
}
