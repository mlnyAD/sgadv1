

"use server";

import { cookies } from "next/headers";
import { listClientsForCurrentOperateur } from "@/features/session/current-operateur-client-action";

const COOKIE_NAME = "current_clt_id";

export async function getCurrentClient() {
  const allowed = await listClientsForCurrentOperateur();
  if (allowed.length === 0) {
    return { current: null, allowed: [], multi: false };
  }

  const cookieStore = await cookies();
  const c = cookieStore.get(COOKIE_NAME)?.value;

  const current = c ? allowed.find((x) => x.clt_id === c) : undefined;

  return {
    current: current ? { cltId: current.clt_id, cltNom: current.clt_nom } : null,
    allowed: allowed.map((x) => ({ cltId: x.clt_id, cltNom: x.clt_nom })),
    multi: allowed.length > 1,
  };
}