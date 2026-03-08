

import { EXPORTS } from "@/domain/export/export.catalog";
import type { ExportDefinition } from "@/domain/export/export.types";

export type ExportParams = {
  exportKey: string;
  exercice?: number;
  dateFrom?: string;
  dateTo?: string;
};

export type ExportContext = {
  cltId?: string;
  userId: string;
};

export type ExportRow = Record<string, unknown>;

export type ExportResult = {
  fileName: string;
  mimeType: string;
  buffer: Buffer;
};

export type ExportWhereClause =
  | { type: "eq"; column: string; value: string | number | boolean }
  | { type: "gte"; column: string; value: string | number }
  | { type: "lte"; column: string; value: string | number };

export interface ExportRepository {
  runViewQuery(input: {
    definition: ExportDefinition;
    where: ExportWhereClause[];
    orderBy?: Array<{ column: string; ascending: boolean }>;
  }): Promise<ExportRow[]>;
}

export interface XlsxBuilder {
  build(input: {
    sheetName: string;
    columns: Array<{ key: string; header: string }>;
    rows: ExportRow[];
  }): Promise<Buffer>;
}

export class ExportError extends Error {
  constructor(
    message: string,
    public code: "EXPORT_NOT_FOUND" | "CLT_ID_REQUIRED"
  ) {
    super(message);
  }
}

export class ExportService {
  constructor(
    private readonly repository: ExportRepository,
    private readonly xlsxBuilder: XlsxBuilder,
  ) {}

  async execute(
    params: ExportParams,
    context: ExportContext
  ): Promise<ExportResult> {

    const definition = EXPORTS.find(e => e.key === params.exportKey);

    if (!definition) {
      throw new ExportError("Export inconnu", "EXPORT_NOT_FOUND");
    }

    if (!context.cltId) {
      throw new ExportError("Client requis", "CLT_ID_REQUIRED");
    }

    const where = this.buildWhereClauses(definition, params, context);

    const rows = await this.repository.runViewQuery({
      definition,
      where,
      orderBy: this.buildOrderBy(definition),
    });

    const buffer = await this.xlsxBuilder.build({
      sheetName: definition.label,
      columns: definition.columns,
      rows,
    });

    return {
      buffer,
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      fileName: `${definition.key}_${Date.now()}.xlsx`,
    };
  }

  private buildWhereClauses(
    definition: ExportDefinition,
    params: ExportParams,
    context: ExportContext
  ): ExportWhereClause[] {

    const where: ExportWhereClause[] = [];

    where.push({
      type: "eq",
      column: "clt_id",
      value: context.cltId!,
    });

    for (const filter of definition.filters ?? []) {
      switch (filter.type) {

        case "exercice":
          where.push({
            type: "eq",
            column: filter.column,
            value: params.exercice!,
          });
          break;

        case "dateRange":
          where.push({
            type: "gte",
            column: filter.fromColumn,
            value: params.dateFrom!,
          });

          where.push({
            type: "lte",
            column: filter.toColumn ?? filter.fromColumn,
            value: params.dateTo!,
          });
          break;
      }
    }

    return where;
  }

  private buildOrderBy(definition: ExportDefinition) {
    const hasDate = definition.columns.some(c => c.key === "inv_due_date");

    if (hasDate) {
      return [{ column: "inv_due_date", ascending: false }];
    }

    return [];
  }
}