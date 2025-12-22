// src/utils/date.ts
export function formatDateFR(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR").format(date);
}
