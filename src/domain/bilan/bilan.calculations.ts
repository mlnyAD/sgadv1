

import { BilanConfig } from "./bilan.config";

export type BilanInputs = { caHt: number; chargesHt: number };

export type BilanOutputs = BilanInputs & {
  rex: number;
  impot: number;
  resultatNet: number;
  reserveLegale: number;
  beneficesNets: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function computeIS(rex: number): number {
  if (rex <= 0) return 0;

  const { reducedLimit, reducedRate, normalRate } = BilanConfig.is;
  const baseReduite = Math.min(rex, reducedLimit);
  const baseNormale = Math.max(0, rex - reducedLimit);

  return baseReduite * reducedRate + baseNormale * normalRate;
}

export function computeReserveLegale(resultatNet: number): number {
  if (resultatNet <= 0) return 0;

  const forfait = BilanConfig.reserveLegale.forfait;
  // safe: jamais > résultat net
  return clamp(forfait, 0, resultatNet);
}

export function computeBilan(input: BilanInputs): BilanOutputs {
  const caHt = Number(input.caHt ?? 0);
  const chargesHt = Number(input.chargesHt ?? 0);

  const rex = caHt - chargesHt;
  const impot = computeIS(rex);
  const resultatNet = rex - impot;

  const reserveLegale = computeReserveLegale(resultatNet);
  const beneficesNets = resultatNet - reserveLegale;

  return { caHt, chargesHt, rex, impot, resultatNet, reserveLegale, beneficesNets };
}