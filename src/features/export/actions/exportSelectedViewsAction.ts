

// src/features/export/actions/exportSelectedViewsAction.ts

"use server";

import { getCurrentClient } from "@/domain/session/current-client";
import type { ExportViewKey } from "@/domain/export/export-view.catalog";
import { listExportViewRows } from "@/domain/export/export-view.repository";
import { generateMultiSheetXlsxBuffer } from "@/domain/export/export-xlsx";

export async function exportSelectedViewsAction(params: {
  viewKeys: ExportViewKey[];
  exerId: string;
}) {
  const { current } = await getCurrentClient({
    requireSelected: true,
    next: "/export",
  });

const cltId = current?.cltId;

if (!cltId) {
  throw new Error("Aucun client courant");
}

  if (!params.exerId) {
    throw new Error("Aucun exercice sélectionné");
  }

  const sheets = await Promise.all(
    params.viewKeys.map(async (viewKey) => ({
      viewKey,
      rows: await listExportViewRows({
        viewKey,
        cltId,
        exerId: params.exerId,
      }),
    })),
  );

  const buffer = generateMultiSheetXlsxBuffer({
    sheets,
  });

  return Array.from(buffer);
}
