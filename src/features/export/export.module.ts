

import "server-only";

import { ExportService } from "./export.service";
import { SupabaseExportRepository } from "./export.repository";
import { XlsxBuilder } from "./xlsx.builder";

export function createExportModule() {

  const repository = new SupabaseExportRepository();
  const builder = new XlsxBuilder();
  const service = new ExportService(repository, builder);

  return {
    service,
  };
}