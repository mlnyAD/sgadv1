

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { creerCompteTreso, majCompteTreso } from "@/features/treso-comptes/enregistrerCompte.data";
import type { TresoCompte } from "@/features/treso-comptes/treso-comptes.types";

import { CompteDialog } from "./components/CompteDialog";

export function TresoComptesScreen(props: { cltId: string; comptes: TresoCompte[] }) {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<TresoCompte | null>(null);

  const nextOrdre = useMemo(() => {
    const max = props.comptes.reduce((acc, c) => Math.max(acc, c.troCptOrdre ?? 0), 0);
    return max + 1;
  }, [props.comptes]);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Comptes de trésorerie</h1>
          <p className="text-sm text-muted-foreground">Gestion des comptes utilisés dans la transaction Trésorerie</p>
        </div>

        <Button
          onClick={() => {
            setEdit(null);
            setOpen(true);
          }}
        >
          Nouveau compte
        </Button>
      </div>

      <Card className="rounded-2xl bg-slate-50/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Liste des comptes</CardTitle>
          <CardDescription>Nom, ordre, inclusion dans le solde global</CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          {props.comptes.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              Aucun compte défini. Crée au minimum “Compte courant” et “Compte épargne”.
            </div>
          ) : null}

          {props.comptes.map((c) => (
            <div
              key={c.troCptId}
              className="flex items-center justify-between gap-4 rounded-lg border bg-background px-3 py-2"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-medium truncate">{c.troCptNom}</div>
                  {!c.troCptActif ? <Badge variant="secondary">Inactif</Badge> : null}
                  {!c.troCptInclusGlobal ? <Badge variant="secondary">Hors global</Badge> : null}
                </div>
                <div className="text-xs text-muted-foreground">Ordre : {c.troCptOrdre}</div>
              </div>

              <Button
                variant="ghost"
                onClick={() => {
                  setEdit(c);
                  setOpen(true);
                }}
              >
                Modifier
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <CompteDialog
        open={open}
        onOpenChange={setOpen}
        initial={{
          nom: edit?.troCptNom ?? "",
          ordre: edit?.troCptOrdre ?? nextOrdre,
          inclusGlobal: edit?.troCptInclusGlobal ?? true,
          actif: edit?.troCptActif ?? true,
        }}
        titre={edit ? "Modifier le compte" : "Nouveau compte"}
        onSave={async (v) => {
          if (edit) {
            await majCompteTreso(supabase, {
              compteId: edit.troCptId,
              nom: v.nom,
              ordre: v.ordre,
              inclusGlobal: v.inclusGlobal,
              actif: v.actif,
            });
          } else {
            await creerCompteTreso(supabase, {
              cltId: props.cltId,
              nom: v.nom,
              ordre: v.ordre,
              inclusGlobal: v.inclusGlobal,
              actif: v.actif,
            });
          }
          setOpen(false);
          router.refresh();
        }}
      />
    </div>
  );
}