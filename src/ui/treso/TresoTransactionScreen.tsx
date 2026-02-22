

"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

import type { ExerciceListeItem } from "@/features/dashboard/exercise/listExercicses.data";
import type { TresoTransactionAnnuelle } from "@/features/treso/treso-transaction.types";
import { eur } from "@/ui/dashboard/format";
import { DASHBOARD_COLORS } from "@/ui/dashboard/dashboard.colors";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { enregistrerTresoInit, enregistrerTresoMois } from "@/features/treso/ecrireTresoMensuel";
import { EditMoisDialog } from "@/ui/treso/EditMoisDialog";
import { EditInitDialog } from "@/ui/treso/EditInitDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function TresoTransactionScreen(props: {
  cltId: string;
  exerId: string;
  exercices: ExerciceListeItem[];
  selectedExerId: string;
  data: TresoTransactionAnnuelle;
}) {
  const router = useRouter();
  const { exercices, selectedExerId, data } = props;

  const onChangeExercice = (exerId: string) => {
    router.push(`/treso?exerId=${encodeURIComponent(exerId)}`);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Trésorerie</h1>
          <p className="text-sm text-muted-foreground">Saisie mensuelle + calcul automatique des soldes</p>
          <div className="text-xs text-muted-foreground">
            À date : {data.dernierMoisSaisi ?? "—"} • Solde global : {eur(data.soldeGlobalADate)} €
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <label className="text-xs text-muted-foreground">Exercice</label>
          <select
            className="h-9 rounded-md border bg-background px-3 text-sm"
            value={selectedExerId}
            onChange={(e) => onChangeExercice(e.target.value)}
          >
            {exercices.map((e) => (
              <option key={e.exerId} value={e.exerId}>
                {(e.exerCode ?? e.exerId)} — {e.debut} → {e.fin}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Separator />

      {/* Tableau simpliste */}
      <Card className="rounded-2xl bg-slate-50/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Saisie mensuelle</CardTitle>
          <CardDescription>Report n-1, crédits, débits, soldes calculés</CardDescription>
        </CardHeader>

        <CardContent className="overflow-auto">
          <table className="min-w-[1100px] w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="py-2 pr-3 w-[260px]">Compte</th>
                <th className="py-2 pr-3 w-[120px]">Report n-1</th>
                {data.mois.map((m) => (
                  <th key={m.mois} className="py-2 pr-3 w-[110px]">{m.label}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.lignes.map((l) => (
                <CompteBloc
  key={l.compte.compteId}
  cltId={props.cltId}
  exerId={props.exerId}
  moisDebutExerIso={data.mois[0]?.mois ?? `${new Date().toISOString().slice(0, 7)}-01`}
  ligne={l}
  mois={data.mois}
/>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Courbes (transaction uniquement) */}
      <Card className="rounded-2xl bg-slate-50/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Évolution des soldes</CardTitle>
          <CardDescription>Courbes des comptes inclus dans le solde global</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.chart.points}>
                <CartesianGrid stroke={DASHBOARD_COLORS.grid} vertical={false} />
                <XAxis dataKey="mois" tick={{ fontSize: 11, fill: DASHBOARD_COLORS.axis }} />
                <YAxis tick={{ fontSize: 11, fill: DASHBOARD_COLORS.axis }} />
                <Tooltip
                  formatter={(value) => {
                    const n = typeof value === "number" ? value : Number(value ?? 0);
                    return `${eur(n)} €`;
                  }}
                />
                <Legend />
                {data.chart.comptes.map((c) => (
                  <Line
                    key={c.compteId}
                    type="monotone"
                    dataKey={c.compteId}
                    name={c.nom}
                    dot={false}
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CompteBloc(props: {
  cltId: string;
  exerId: string;
  moisDebutExerIso: string;
  ligne: TresoTransactionAnnuelle["lignes"][number];
  mois: { mois: string; label: string }[];
}) {
  
  const { cltId, exerId, moisDebutExerIso, ligne, mois } = props;
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const [openInit, setOpenInit] = useState(false);
  const [openMois, setOpenMois] = useState(false);
  const [moisCourant, setMoisCourant] = useState<{ moisIso: string; label: string } | null>(null);

  const creditsInit = moisCourant ? (ligne.credits[moisCourant.moisIso] ?? 0) : 0;
  const debitsInit = moisCourant ? (ligne.debits[moisCourant.moisIso] ?? 0) : 0;

  return (
    <>
      {/* header compte + report n-1 cliquable */}
      <tr className="border-t">
        <td className="py-3 pr-3 align-top">
          <div className="flex items-center gap-2">
            <div className="font-medium">{ligne.compte.nom}</div>
            {!ligne.compte.inclusGlobal ? <Badge variant="secondary">Hors global</Badge> : null}
          </div>
        </td>

        <td className="py-3 pr-3 align-top">
          <Button variant="ghost" className="h-8 px-2 tabular-nums"
            onClick={() => setOpenInit(true)}
            title="Modifier le report n-1"
          >
            {eur(ligne.soldeInit)} €
          </Button>
        </td>

        {mois.map((m) => (
          <td key={m.mois} className="py-3 pr-3 align-top text-muted-foreground"> </td>
        ))}
      </tr>

      {/* crédits */}
      <tr>
        <td className="py-2 pr-3 text-muted-foreground">Crédits</td>
        <td className="py-2 pr-3 text-muted-foreground">—</td>
        {mois.map((m) => (
          <td key={m.mois} className="py-2 pr-3">
            <Button
              variant="ghost"
              className="h-8 px-2 tabular-nums"
              onClick={() => {
                setMoisCourant({ moisIso: m.mois, label: m.label });
                setOpenMois(true);
              }}
              title={`Saisir crédits/débits — ${m.label}`}
            >
              {eur(ligne.credits[m.mois] ?? 0)} €
            </Button>
          </td>
        ))}
      </tr>

      {/* débits */}
      <tr>
        <td className="py-2 pr-3 text-muted-foreground">Débits</td>
        <td className="py-2 pr-3 text-muted-foreground">—</td>
        {mois.map((m) => (
          <td key={m.mois} className="py-2 pr-3 tabular-nums">
            {eur(ligne.debits[m.mois] ?? 0)} €
          </td>
        ))}
      </tr>

      {/* soldes */}
      <tr>
        <td className="py-2 pr-3 text-muted-foreground">Solde (calculé)</td>
        <td className="py-2 pr-3 text-muted-foreground">—</td>
        {mois.map((m) => (
          <td key={m.mois} className="py-2 pr-3 font-medium tabular-nums">
            {eur(ligne.soldes[m.mois] ?? ligne.soldeInit)} €
          </td>
        ))}
      </tr>

      {/* Dialog init */}
      <EditInitDialog
        open={openInit}
        onOpenChange={setOpenInit}
        soldeInit={ligne.soldeInit}
        onSave={async (soldeInit) => {
          await enregistrerTresoInit(supabase, {
  cltId,
  exerId,
  cptId: ligne.compte.compteId,
  moisDebutExerIso,
  soldeInit,
});
          router.refresh();
        }}
      />

      {/* Dialog mois */}
      <EditMoisDialog
        open={openMois}
        onOpenChange={setOpenMois}
        titre={`Saisie — ${ligne.compte.nom} — ${moisCourant?.label ?? ""}`}
        creditsInit={creditsInit}
        debitsInit={debitsInit}
        onSave={async (credits, debits) => {
          if (!moisCourant) return;
          await enregistrerTresoMois(supabase, {
            cltId,
            exerId,
            cptId: ligne.compte.compteId,
            moisIso: moisCourant.moisIso,
            credits,
            debits,
          });
          router.refresh();
        }}
      />
    </>
  );
}