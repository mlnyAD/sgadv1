

// src/app/(session)/select-client/page.tsx

import SelectClientList from "./select-client-list";
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";

type Client = {
  id: string;
  nom: string;
};

export default async function SelectClientPage({ searchParams }: { searchParams?: { next?: string; error?: string } }) {
  const supabase = await createSupabaseServerReadClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !user.email) return <div>Utilisateur non connecté.</div>;

  const { data: operateur } = await supabase
    .from("operateur")
    .select("oper_id")
    .eq("oper_email", user.email)
    .single();

  if (!operateur) return <div>Opérateur introuvable.</div>;

  // 1️⃣ Récupérer les clients liés
  const { data: memberships } = await supabase
    .from("operateur_client")
    .select("clt_id")
    .eq("oper_id", operateur.oper_id);

  const clientIds = (memberships ?? []).map((m) => m.clt_id);

  
// Initialisation explicite de clients comme tableau de Client
let clients: Client[] = [];

if (clientIds.length > 0) {
  const { data: clientData } = await supabase
    .from("client")
    .select("clt_id, clt_nom")
    .in("clt_id", clientIds);

  // Typage explicite
  clients = (clientData ?? []).map((c: { clt_id: string; clt_nom: string }) => ({
    id: c.clt_id,
    nom: c.clt_nom,
  }));
}

  return <SelectClientList searchParams={searchParams} clients={clients} />;
}