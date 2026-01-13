

import { notFound } from "next/navigation";
import { getLotTravById, listProjectContacts } from "@/domain/lottrav/lottrav.repository";
import { LotTravEditor } from "@/ui/lottrav/LotTravEditor";


type Props = {
  params: Promise<{
    projectId: string;
    lottravId: string;
  }>;
};

export default async function EditLotPage({ params }: Props) {

  const { projectId, lottravId } = await params;

  const lotId = Number(lottravId);
  if (!Number.isInteger(lotId)) {
    notFound();
  }

  const lot = await getLotTravById(lotId);
  if (!lot) {
    notFound();
  }

   const projectIdNum = Number(projectId)

const operators = await listProjectContacts();

  return (
    <LotTravEditor
      projectId={projectIdNum}
      initialLot={lot}
      	  operators={operators}
    />
  );
}




