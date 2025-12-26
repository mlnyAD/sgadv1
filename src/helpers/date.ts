// src/helper/date.ts

/**
 * Retourne la date au format JJ:MM:AAAA
 */
export function formatDateFR(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR").format(date);
}

/**
 * Retourne la date du jour au format YYYY-MM-DD
 * (compatible <input type="date">)
 */
export function getTodayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Retourne la date du jour + N jours au format YYYY-MM-DD
 */
export function addDaysISO(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Retourne une date affichable pour le champ de saisie
 */

export function toDateInputValue(value?: string | Date | null): string {
  if (!value) return "";

  const d = typeof value === "string" ? new Date(value) : value;

  if (isNaN(d.getTime())) return "";

  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}