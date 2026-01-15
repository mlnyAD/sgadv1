

import { LotTravEditor } from "@/ui/lottrav/edit/LotTravEditor";
import { listProjectContacts } from "@/domain/lottrav/lottrav-repository";
import { notFound } from "next/navigation";


type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function CreateLotPage({ params }: Props) {

  const { projectId } = await params;

  const projectIdNum = Number(projectId);
  if (!Number.isInteger(projectIdNum)) {
    notFound();
  }

  const operators = await listProjectContacts();


  return (
    <LotTravEditor
      projectId={projectIdNum}
      initialLot={null}
      operators={operators}
    />
  );
}
