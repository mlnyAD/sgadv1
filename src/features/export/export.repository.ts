

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import type {
  ExportRepository,
  ExportRow,
  ExportWhereClause,
} from "./export.service";
import type { ExportDefinition } from "@/domain/export/export.types";

export class SupabaseExportRepository implements ExportRepository {
  async runViewQuery(input: {
    definition: ExportDefinition;
    where: ExportWhereClause[];
    orderBy?: Array<{ column: string; ascending: boolean }>;
  }): Promise<ExportRow[]> {
    const supabase = await createSupabaseServerReadClient();

    const selectClause = input.definition.columns.map((c) => c.key).join(",");

    let query = supabase
      .from(input.definition.view as any)
      .select(selectClause);

    for (const clause of input.where) {
      switch (clause.type) {
        case "eq":
          query = query.eq(clause.column, clause.value);
          break;

        case "gte":
          query = query.gte(clause.column, clause.value);
          break;

        case "lte":
          query = query.lte(clause.column, clause.value);
          break;
      }
    }

    for (const order of input.orderBy ?? []) {
      query = query.order(order.column, { ascending: order.ascending });
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as unknown as ExportRow[];
  }
}