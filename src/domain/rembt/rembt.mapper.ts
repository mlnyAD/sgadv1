

import type { RemboursementRow } from "./rembt.types";

export function mapRemboursementViewRow(row: any): RemboursementRow {
  return {
    rbt_id: row.rbt_id,
    clt_id: row.clt_id,
    exer_id: row.exer_id,
    rbt_date: row.rbt_date,
    rbt_amount: Number(row.rbt_amount ?? 0),
    lmod: row.lmod,
    clt_nom: row.clt_nom ?? null,
    clt_code: row.clt_code ?? null,
    exer_code: row.exer_code ?? null,
  };
}