

"use client";

import { useRouter } from "next/navigation";
import { GenericListTable } from "@/components/table/GenericListTable";
import type { LotTravView } from "@/domain/lottrav/lottrav-view";
import { toast } from "sonner";
import { getLotTravColumns } from "@/ui/lottrav/LotTravColumns";
import { LotTravSelectableColumns } from "@/ui/lottrav/LotTravSelectableColumns";
import { useState } from "react";
import DeleteLotTravDialog from "@/ui/lottrav/DeleteLotTravDialog";


interface LotTravListProps {
  projectId: number;
  lots: LotTravView[];
  page: number;
  pageSize: number;
  totalPages: number;
}

export function LotTravList({ projectId, lots, page, pageSize, totalPages }: LotTravListProps) {

  const router = useRouter();

  const [visibleColumns] = useState(LotTravSelectableColumns);
  const [deleteTarget, setDeleteTarget] = useState<LotTravView | null>(null);

  const handleEdit = (lot: LotTravView) => {
    router.push(`/projects/${projectId}/lots/${lot.id}`);
  };
  const handlePlanning = () => {
    toast.info(
      "Le planning du lot sera disponible dans une prochaine version."
    );
  };

  const columns = getLotTravColumns({
    onEdit: handleEdit,
    onPlanning: handlePlanning,
    onDelete: (lot) => setDeleteTarget(lot),
  });

  return (
    <>

      <GenericListTable
        data={lots}
        columns={columns}
        selectableColumns={visibleColumns}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={(nextPage) => {
          router.push(`?page=${nextPage}&pageSize=${pageSize}`);
        }}
        onPageSizeChange={(nextPageSize) => {
          router.push(`?page=1&pageSize=${nextPageSize}`);
        }}
      />
      {deleteTarget && (
        <DeleteLotTravDialog
          open={true}
          onOpenChange={() => setDeleteTarget(null)}
          projectId={projectId}      
          lotId={deleteTarget.id}
          lotName={deleteTarget.nom}
          onDeleted={() => {
            setDeleteTarget(null);
            router.refresh();
          }}
        />
      )}

    </>

  );
}
