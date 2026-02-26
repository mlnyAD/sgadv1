

export type RemBtId = string;

export type RemboursementRow = {
  rbt_id: string;
  clt_id: string;
  exer_id: string;
  rbt_date: string;   // ISO date (YYYY-MM-DD)
  rbt_amount: number;
  lmod: string;       // timestamptz
  // enrichissements (vw)
  clt_nom?: string | null;
  clt_code?: string | null;
  exer_code?: string | null;
};

export type RefundState = {
  cltId: string;
  exerId: string;
  exerCode?: string | null;
  toRefundAmount: number;
  refundedAmount: number;
  remainingAmount: number;
};