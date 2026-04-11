

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { computeBilan } from "@/domain/bilan/bilan.calculations";

export type BilanExerciseOption = { exer_id: string; exer_code: string | null };

export type BilanColumn = {
  caHt: number;
  chargesHt: number;
  rex: number;
  impot: number;
  resultatNet: number;
  reserveLegale: number;
  beneficesNets: number;
};

export function BilanScreenClient(props: {
  exerid: string;
  exerciseOptions: BilanExerciseOption[];
  columns: { budget: BilanColumn; toDate: BilanColumn; sandbox: BilanColumn };
  meta: {
    exerCode: string | null;
    config: {
      is: { reducedRate: number; reducedLimit: number; normalRate: number };
      reserveLegale: { forfait: number };
    };
  };
}) {
  const { exerid, exerciseOptions, columns, meta } = props;
  const router = useRouter();

  const onExerChange = (nextExerId: string) => {
    router.push(`/bilan?exerid=${encodeURIComponent(nextExerId)}`);
  };

  // Format spécifique bilan
  function bilanNumber(n: number) {
    return Math.round(n ?? 0).toLocaleString("fr-FR", {
      maximumFractionDigits: 0,
    });
  }

  function toNumberOrZero(v: string) {
    const n = Number(String(v).replace(",", "."));
    return Number.isFinite(n) ? n : 0;
  }

  // Bac à sable
  const [sandboxCa, setSandboxCa] = React.useState<number>(columns.toDate.caHt ?? 0);
  const [sandboxCharges, setSandboxCharges] = React.useState<number>(columns.toDate.chargesHt ?? 0);

  React.useEffect(() => {
    setSandboxCa(columns.toDate.caHt ?? 0);
    setSandboxCharges(columns.toDate.chargesHt ?? 0);
  }, [columns.toDate.caHt, columns.toDate.chargesHt, exerid]);

  const sandboxComputed = React.useMemo(
    () => computeBilan({ caHt: sandboxCa, chargesHt: sandboxCharges }),
    [sandboxCa, sandboxCharges]
  );

  const rows = [
    { label: "Chiffre d'affaires (CA HT)", key: "caHt" as const },
    { label: "Charges (HT)", key: "chargesHt" as const },
    { label: "Résultat d'exploitation (REX)", key: "rex" as const },
    { label: "Impôts (IS)", key: "impot" as const },
    { label: "Résultat net", key: "resultatNet" as const },
    { label: "Réserve légale", key: "reserveLegale" as const },
    { label: "Bénéfices nets", key: "beneficesNets" as const },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Bilan — Exercice {meta.exerCode ?? exerid}
            </h1>
            <p className="text-sm text-muted-foreground">
              Simulation indicative (ne remplace pas le bilan comptable).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-60">
              <Select value={exerid} onValueChange={onExerChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un exercice" />
                </SelectTrigger>
                <SelectContent>
                  {exerciseOptions.map((o) => (
                    <SelectItem key={o.exer_id} value={o.exer_id}>
                      {o.exer_code ?? o.exer_id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Link
              href="/dashboard"
              className="inline-flex items-center h-9 px-4 rounded-md border border-muted-foreground/40 text-foreground hover:bg-muted text-base"
            >
              Fermer
            </Link>
          </div>
        </div>

        <Separator />
      </div>

      {/* Table */}
      <Card className="rounded-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Synthèse</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-60">Indicateur</TableHead>
                <TableHead className="text-right">Selon budget</TableHead>
                <TableHead className="text-right">Bilan à date</TableHead>
                <TableHead className="text-right">Bac à sable</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.map((r) => {
                const b = columns.budget[r.key];
                const d = columns.toDate[r.key];
                const s = sandboxComputed[r.key];

                const isEditable = r.key === "caHt" || r.key === "chargesHt";

                return (
                  <TableRow key={r.key}>
                    <TableCell className="font-medium">{r.label}</TableCell>

                    <TableCell className="text-right tabular-nums bg-blue-50">
                      {bilanNumber(Number(b ?? 0))}
                    </TableCell>

                    <TableCell className="text-right tabular-nums bg-amber-50">
                      {bilanNumber(Number(d ?? 0))}
                    </TableCell>

                    <TableCell className="text-right bg-gray-200">
                      {isEditable ? (
                        <Input
                          className="h-8 w-36 ml-auto text-right tabular-nums bg-green-50"
                          inputMode="decimal"
                          value={String(r.key === "caHt" ? sandboxCa : sandboxCharges)}
                          onChange={(e) => {
                            const v = toNumberOrZero(e.target.value);
                            if (r.key === "caHt") setSandboxCa(v);
                            else setSandboxCharges(v);
                          }}
                        />
                      ) : (
                        <span className="tabular-nums">
                          {bilanNumber(Number(s ?? 0))}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Paramètres */}
      <Card className="rounded-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Paramètres</CardTitle>
        </CardHeader>

        <CardContent className="text-sm space-y-2">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <div>
              IS réduit :{" "}
              <span className="font-medium">
                {Math.round(meta.config.is.reducedRate * 100)}%
              </span>{" "}
              jusqu’à{" "}
              <span className="font-medium">
                {bilanNumber(meta.config.is.reducedLimit)}
              </span>
            </div>

            <div>
              IS normal :{" "}
              <span className="font-medium">
                {Math.round(meta.config.is.normalRate * 100)}%
              </span>
            </div>

            <div>
              Réserve légale (forfait) :{" "}
              <span className="font-medium">
                {bilanNumber(meta.config.reserveLegale.forfait)}
              </span>
            </div>
          </div>

          <div className="text-muted-foreground">
            Hypothèses simplifiées : IS uniquement, réserve légale forfaitaire.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}