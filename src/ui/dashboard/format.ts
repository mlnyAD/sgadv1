

export function eur(n: number) {
  return (n ?? 0).toLocaleString("fr-FR", { maximumFractionDigits: 0 });
}