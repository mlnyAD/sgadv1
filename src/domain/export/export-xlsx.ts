

// src/domain/export/export-xlsx.ts

import "server-only";

import * as XLSX from "xlsx";
import {
  getExportViewConfig,
  type ExportViewKey,
} from "./export-view.catalog";

function safeSheetName(value: string): string {
  return value
    .replace(/[\\/?*[\]:]/g, " ")
    .trim()
    .slice(0, 31);
}

export function generateMultiSheetXlsxBuffer(params: {
  sheets: {
    viewKey: ExportViewKey;
    rows: Record<string, unknown>[];
  }[];
}): Buffer {
  const workbook = XLSX.utils.book_new();

  for (const sheet of params.sheets) {
    const config = getExportViewConfig(sheet.viewKey);
    const sheetName = safeSheetName(config?.label ?? sheet.viewKey);

    const worksheet = XLSX.utils.json_to_sheet(sheet.rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  }

  return XLSX.write(workbook, {
    type: "buffer",
    bookType: "xlsx",
  });
}