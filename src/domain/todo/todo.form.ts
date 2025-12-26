

export interface TodoFormValues {
  titre: string;
  text: string;
  creation: string;
  cloture: string;
  urgent: boolean;
  important: boolean;
  etatId: number | null; // ✅ au lieu de 1|2|3|4|null
}
