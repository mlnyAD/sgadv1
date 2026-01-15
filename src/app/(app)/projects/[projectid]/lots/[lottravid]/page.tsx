

import { notFound } from "next/navigation";
import { getLotTravById, listProjectContacts } from "@/domain/lottrav/lottrav-repository";
import { LotTravEditor } from "@/ui/lottrav/edit/LotTravEditor";


type Props = {
  params: Promise<{
    projectid: string;
    lottravid: string;
  }>;
};

export default async function EditLotPage({ params }: Props) {

  const { projectid, lottravid } = await params;

  const lotId = Number(lottravid);
  if (!Number.isInteger(lotId)) {
    notFound();
  }

  const lot = await getLotTravById(lotId);
  if (!lot) {
    notFound();
  }

   
const projectIdNum = Number(projectid);
if (!Number.isInteger(projectIdNum)) {
  notFound();
}

const operators = await listProjectContacts();

  return (
    <LotTravEditor
      projectId={projectIdNum}
      initialLot={lot}
      operators={operators}
    />
  );
}




