

"use client";

import { usePathname, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useClientOptional } from "@/contexts/ClientContext";

export default function HeaderInfo() {
  const router = useRouter();
  const pathname = usePathname();

  const ctx = useClientOptional();
  const currentClient = ctx?.currentClient;
  const multi = ctx?.multi ?? false;

  // AdminSys (pas de provider) => rien à afficher
  if (!currentClient) return null;

  function goSelectClient() {
    const next = pathname || "/dashboard";
    router.push(`/select-client?next=${encodeURIComponent(next)}`);
  }

  return (
    <div className="hidden md:flex flex-1 items-center gap-2 text-sm text-muted-foreground">
      <Badge className="bg-ad-dark text-white hover:bg-ad-dark/90">
        {currentClient.nom}
      </Badge>

      {multi ? (
        <button
          type="button"
          className="text-xs underline hover:opacity-80"
          onClick={goSelectClient}
        >
          Changer
        </button>
      ) : null}
    </div>
  );
}