

"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

import type { ExerciceListeItem } from "@/features/dashboard/exercise/listExercicses.data";
import type { TresoTransactionAnnuelle } from "@/features/treso/treso-transaction.types";
import { eur } from "@/ui/dashboard/format";
import { DASHBOARD_COLORS } from "@/ui/dashboard/dashboard.colors";
import { enregistrerTresoInit, enregistrerTresoMois } from "@/features/treso/ecrireTresoMensuel";
import { EditMoisDialog } from "@/ui/treso/EditMoisDialog";
import { EditInitDialog } from "@/ui/treso/EditInitDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type TresoLigne = TresoTransactionAnnuelle["lignes"][number];
type TresoMoisItem = TresoTransactionAnnuelle["mois"][number];

function splitLignes(lignes: TresoLigne[]) {
  const inclus = lignes
    .filter((l: TresoLigne) => l.compte.inclusGlobal)
    .sort((a: TresoLigne, b: TresoLigne) => a.compte.nom.localeCompare(b.compte.nom));

  const hors = lignes
    .filter((l: TresoLigne) => !l.compte.inclusGlobal)
    .sort((a: TresoLigne, b: TresoLigne) => a.compte.nom.localeCompare(b.compte.nom));

  return { inclus, hors };
}

function sumByMonth(
  mois: TresoMoisItem[],
  lignes: TresoLigne[],
  picker: (l: TresoLigne) => Record<string, number>
) {
  const out: Record<string, number> = {};
  for (const m of mois) out[m.mois] = 0;

  for (const l of lignes) {
    const map = picker(l);
    for (const m of mois) out[m.mois] += map[m.mois] ?? 0;
  }

  return out;
}

function calcTotalGlobal(mois: TresoMoisItem[], inclus: TresoLigne[]) {
  return {
    nom: "Total global",
    soldeInit: inclus.reduce((acc: number, l: TresoLigne) => acc + (l.soldeInit ?? 0), 0),
    credits: sumByMonth(mois, inclus, (l) => l.credits),
    debits: sumByMonth(mois, inclus, (l) => l.debits),
    soldes: sumByMonth(mois, inclus, (l) => l.soldes),
  };
}

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
      <Tabs defaultValue="saisie" className="space-y-4">
        <TabsList>
          <TabsTrigger value="saisie">Saisie</TabsTrigger>
          <TabsTrigger value="graph">Graphique</TabsTrigger>
        </TabsList>

        <TabsContent value="saisie">
          <Card className="rounded-2xl bg-slate-50/40">
   
            <CardContent className="overflow-auto pt-2">
              <table className="min-w-[1100px] w-full text-[13px] leading-tight">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="py-1 pr-2 w-[220px]">Compte</th>
                    <th className="py-1 pr-2 w-[120px]">Report n-1</th>
                    {data.mois.map((m) => (
                      <th key={m.mois} className="py-2 pr-3 w-[110px]">
                        {m.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {(() => {
                    const { inclus, hors } = splitLignes(data.lignes);
                    const total = calcTotalGlobal(data.mois, inclus);

                    return (
                      <>
                        {/* 1) TOTAL GLOBAL */}
                        <TotalBloc total={total} mois={data.mois} />

                        {/* 2) COMPTES INCLUS */}
                        {inclus.map((l) => (
                          <CompteBloc
                            key={l.compte.compteId}
                            exerId={props.exerId}
                            moisDebutExerIso={data.mois[0]?.mois ?? `${new Date().toISOString().slice(0, 7)}-01`}
                            ligne={l}
                            mois={data.mois}
                          />
                        ))}

                        {/* séparateur léger */}
                        {hors.length ? (
                          <tr>
                            <td colSpan={2 + data.mois.length} className="pt-2">
                              <div className="h-px bg-muted" />
                            </td>
                          </tr>
                        ) : null}

                        {/* 3) COMPTES HORS GLOBAL */}
                        {hors.map((l) => (
                          <CompteBloc
                            key={l.compte.compteId}
                            exerId={props.exerId}
                            moisDebutExerIso={data.mois[0]?.mois ?? `${new Date().toISOString().slice(0, 7)}-01`}
                            ligne={l}
                            mois={data.mois}
                          />
                        ))}
                      </>
                    );
                  })()}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="graph">
          <Card className="rounded-2xl bg-slate-50/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Évolution des soldes</CardTitle>
              <CardDescription>Total global + comptes hors global</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="h-80">
                {/* on modifie le dataset chart, voir section D */}
                <TresoChart data={data} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Separator />

    </div>
  );
}

function CompteBloc(props: {
  exerId: string;
  moisDebutExerIso: string;
  ligne: TresoTransactionAnnuelle["lignes"][number];
  mois: { mois: string; label: string }[];
}) {
  const { exerId, moisDebutExerIso, ligne, mois } = props;

  const router = useRouter();

  const [openInit, setOpenInit] = useState(false);
  const [openMois, setOpenMois] = useState(false);
  const [moisCourant, setMoisCourant] = useState<{ moisIso: string; label: string } | null>(null);

  const creditsInit = moisCourant ? (ligne.credits[moisCourant.moisIso] ?? 0) : 0;
  const debitsInit = moisCourant ? (ligne.debits[moisCourant.moisIso] ?? 0) : 0;

  return (
    <>
      {/* Header compte */}
      <tr className="border-t">
        <td className="py-1 pr-2 align-top">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-2 py-0.5">
              {ligne.compte.nom}
            </Badge>

            {!ligne.compte.inclusGlobal ? (
              <Badge variant="outline" className="px-2 py-0.5">
                Hors global
              </Badge>
            ) : null}
          </div>
        </td>

        {/* Report n-1 : vide sur la ligne header (affiché sur ligne solde) */}
        <td className="py-1 pr-2 align-top text-muted-foreground"> </td>

        {mois.map((m) => (
          <td key={m.mois} className="py-2 pr-3 align-top text-muted-foreground" />
        ))}
      </tr>

      {/* Crédits (cliquable -> saisie mois) */}
      <tr>
        <td className="py-1.5 pr-3 text-muted-foreground">Crédits</td>
        <td className="py-1.5 pr-3 text-muted-foreground">—</td>

        {mois.map((m) => (
          <td key={m.mois} className="py-1.5 pr-3">
            <Button
              variant="ghost"
              className="h-7 px-2 tabular-nums font-normal"
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

      {/* Débits */}
      <tr>
        <td className="py-1.5 pr-3 text-muted-foreground">Débits</td>
        <td className="py-1.5 pr-3 text-muted-foreground">—</td>

        {mois.map((m) => (
          <td key={m.mois} className="py-1.5 pr-3 tabular-nums">
            {eur(ligne.debits[m.mois] ?? 0)} €
          </td>
        ))}
      </tr>

      {/* Soldes (calculé) + report n-1 cliquable */}
      <tr>
        <td className="py-1.5 pr-3 text-muted-foreground">Solde (calculé)</td>

        {/* Report n-1 ici */}
        <td className="py-1.5 pr-3">
          <Button
            variant="ghost"
            className="h-7 px-2 tabular-nums font-normal"
            onClick={() => setOpenInit(true)}
            title="Modifier le report n-1"
          >
            {eur(ligne.soldeInit)} €
          </Button>
        </td>

        {mois.map((m) => (
          <td key={m.mois} className="py-1.5 pr-3 font-medium tabular-nums">
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
          // ⚠️ garde tes actions serveur ici (ex: enregistrerTresoInitAction)
          await enregistrerTresoInit({
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

          await enregistrerTresoMois({
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

function TresoChart({ data }: { data: TresoTransactionAnnuelle }) {
  const { inclus, hors } = splitLignes(data.lignes);
  const total = calcTotalGlobal(data.mois, inclus);

  // points: un tableau [{mois, TOTAL_GLOBAL, <compteHors1>, <compteHors2> ...}]
  const points = data.mois.map((m) => {
    const row: Record<string, any> = { mois: m.label };

    row["TOTAL_GLOBAL"] = total.soldes[m.mois] ?? total.soldeInit;

    for (const l of hors) {
      row[l.compte.compteId] = l.soldes[m.mois] ?? l.soldeInit;
    }
    return row;
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={points}>
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

        <Line
          key="TOTAL_GLOBAL"
          type="monotone"
          dataKey="TOTAL_GLOBAL"
          name="Total global"
          dot={false}
          strokeWidth={3}
        />

        {hors.map((c) => (
          <Line
            key={c.compte.compteId}
            type="monotone"
            dataKey={c.compte.compteId}
            name={c.compte.nom}
            dot={false}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

function TotalBloc(props: {
  total: {
    nom: string;
    soldeInit: number;
    credits: Record<string, number>;
    debits: Record<string, number>;
    soldes: Record<string, number>;
  };
  mois: { mois: string; label: string }[];
}) {
  const { total, mois } = props;

  const rowClass = "bg-gray-200/70 select-none pointer-events-none";

  return (
    <>
      {/* header */}
      <tr className={`border-t ${rowClass}`}>
        <td className="py-1 pr-2 align-top">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="px-2 py-0.5">
              {total.nom}
            </Badge>
          </div>
        </td>
        <td className="py-1 pr-2 align-top text-muted-foreground"> </td>
        {mois.map((m) => (
          <td key={m.mois} className="py-1 pr-2 align-top text-muted-foreground" />
        ))}
      </tr>

      {/* crédits */}
      <tr className={rowClass}>
        <td className="py-1 pr-2 text-muted-foreground">Crédits</td>
        <td className="py-1 pr-2 text-muted-foreground">—</td>
        {mois.map((m) => (
          <td key={m.mois} className="py-1 pr-2 tabular-nums">
            {eur(total.credits[m.mois] ?? 0)} €
          </td>
        ))}
      </tr>

      {/* débits */}
      <tr className={rowClass}>
        <td className="py-1 pr-2 text-muted-foreground">Débits</td>
        <td className="py-1 pr-2 text-muted-foreground">—</td>
        {mois.map((m) => (
          <td key={m.mois} className="py-1 pr-2 tabular-nums">
            {eur(total.debits[m.mois] ?? 0)} €
          </td>
        ))}
      </tr>

      {/* soldes + report n-1 */}
      <tr className={rowClass}>
        <td className="py-1 pr-2 text-muted-foreground">Solde (calculé)</td>
        <td className="py-1 pr-2 font-medium tabular-nums">
          {eur(total.soldeInit)} €
        </td>
        {mois.map((m) => (
          <td key={m.mois} className="py-1 pr-2 font-medium tabular-nums">
            {eur(total.soldes[m.mois] ?? total.soldeInit)} €
          </td>
        ))}
      </tr>
    </>
  );
}