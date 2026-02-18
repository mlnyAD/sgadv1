

"use server";

import { cookies } from "next/headers";
import { listClientsForCurrentOperateur } from "@/features/session/current-operateur-client-action";

const COOKIE_NAME = "current_clt_id";

export async function getCurrentClient() {

  const allowed = await listClientsForCurrentOperateur();
  if (allowed.length === 0) {
    return { current: null, allowed: [], multi: false };
  }

  const cookieStore = await cookies(); // (si ta version exige await, remets await)
  const c = cookieStore.get(COOKIE_NAME)?.value;

  // 1) on essaie de retrouver le client via le cookie
  // 2) sinon fallback sur le premier client autorisé
  const currentRow = (c ? allowed.find((x) => x.clt_id === c) : undefined) ?? allowed[0];

  return {
    current: { cltId: currentRow.clt_id, cltNom: currentRow.clt_nom },
    allowed: allowed.map((x) => ({ cltId: x.clt_id, cltNom: x.clt_nom })),
    multi: allowed.length > 1,
  };
}