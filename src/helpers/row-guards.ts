

// src/helpers/row-guards.ts

export function reqStr(v: string | null, field: string, source?: string): string {
  if (v === null) {
    throw new Error(`${source ?? "row"}.${field} is null`);
  }
  return v;
}

export function reqBool(v: boolean | null, field: string, source?: string): boolean {
  if (v === null) {
    throw new Error(`${source ?? "row"}.${field} is null`);
  }
  return v;
}

export function reqNum(v: number | null, field: string, source?: string): number {
  if (v === null) throw new Error(`${source ?? "row"}.${field} is null`);
  return v;
}