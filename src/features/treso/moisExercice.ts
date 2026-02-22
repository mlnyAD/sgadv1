

export type MoisExercice = { mois: string; label: string };

const MOIS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

function toMonthStart(isoDate: string) {
  // isoDate = YYYY-MM-DD
  return `${isoDate.slice(0, 7)}-01`;
}

function addMonths(monthIso: string, add: number) {
  const y = Number(monthIso.slice(0, 4));
  const m = Number(monthIso.slice(5, 7)); // 1..12
  const d = 1;

  const dt = new Date(Date.UTC(y, m - 1 + add, d));
  const yy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
  return `${yy}-${mm}-01`;
}

export function buildMoisExercice(debutIso: string, finIso: string): MoisExercice[] {
  const start = toMonthStart(debutIso);
  const end = toMonthStart(finIso);

  const out: MoisExercice[] = [];

  let cur = start;
  // boucle max 24 pour éviter toute erreur de données
  for (let i = 0; i < 24; i++) {
    const year = cur.slice(0, 4);
    const monthIdx = Number(cur.slice(5, 7)) - 1;
    out.push({ mois: cur, label: `${MOIS[monthIdx]} ${year}` });

    if (cur === end) break;
    cur = addMonths(cur, 1);
  }

  return out;
}