

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { listClientsForCurrentOperateur } from "@/features/session/current-operateur-client-action";

const COOKIE_NAME = "current_clt_id";

type GetCurrentClientOptions = {
  requireSelected?: boolean;
  next?: string;
};

export async function getCurrentClient(options?: GetCurrentClientOptions) {
  const allowed = await listClientsForCurrentOperateur();

  if (allowed.length === 0) {
    if (options?.requireSelected) {
      const safeNext =
        options.next && options.next.startsWith("/")
          ? options.next
          : "/dashboard";

      redirect(`/select-client?next=${encodeURIComponent(safeNext)}`);
    }

    return { current: null, allowed: [], multi: false };
  }

  const cookieStore = await cookies();
  const c = cookieStore.get(COOKIE_NAME)?.value;

  const allowedClients = allowed.map((x) => ({
    cltId: x.clt_id,
    cltNom: x.clt_nom,
    cltLogoPath: x.clt_logo_path ?? null,
  }));

  if (allowed.length === 1) {
    const only = allowed[0];

    return {
      current: {
        cltId: only.clt_id,
        cltNom: only.clt_nom,
        cltLogoPath: only.clt_logo_path ?? null,
      },
      allowed: allowedClients,
      multi: false,
    };
  }

  const currentRow = c ? allowed.find((x) => x.clt_id === c) : undefined;

  if (!currentRow) {
    if (options?.requireSelected) {
      const safeNext =
        options.next && options.next.startsWith("/")
          ? options.next
          : "/dashboard";

      redirect(`/select-client?next=${encodeURIComponent(safeNext)}`);
    }

    return {
      current: null,
      allowed: allowedClients,
      multi: true,
    };
  }

  return {
    current: {
      cltId: currentRow.clt_id,
      cltNom: currentRow.clt_nom,
      cltLogoPath: currentRow.clt_logo_path ?? null,
    },
    allowed: allowedClients,
    multi: true,
  };
}