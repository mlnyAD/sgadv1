

import { TaskList } from "@/ui/task/list/TaskList";
import { TaskToolbar } from "@/ui/task/list/TaskToolbar";
import { listTaskByLotTrav } from "@/domain/task/task-repository";

type Props = {
  params: Promise<{
    projectid: string;
    lottravid: string;
  }>;
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
    etatId?: string;
  }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { projectid, lottravid } = await params;
  const { page, pageSize, search, etatId } = await searchParams;

  const projectId = Number(projectid);
  const lottravId = Number(lottravid);

  const pageNum = Number(page ?? 1);
  const pageSizeNum = Number(pageSize ?? 20);

  const statusId = etatId ? Number(etatId) : undefined;

  const { data, total } = await listTaskByLotTrav({
    lotTravId: lottravId,
    page: pageNum,
    pageSize: pageSizeNum,
    search,
    etatId: statusId,
  });

  return (
    <>
      <TaskToolbar
        projectId={projectId}
        lottravId={lottravId}
      />

      <TaskList
        projectId={projectId}
        lottravId={lottravId}
        tasks={data}
        page={pageNum}
        pageSize={pageSizeNum}
        totalPages={Math.ceil(total / pageSizeNum)}
      />
    </>
  );
}
