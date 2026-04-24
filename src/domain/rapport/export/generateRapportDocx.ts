

// src/domain/rapport/export/generateRapportDocx.ts

import {
  AlignmentType,
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  type FileChild,
} from "docx";

import type { RapportFinancierViewModel } from "../types";

type DocxColumn = {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
};

type DocxTableData = {
  columns: DocxColumn[];
  rows: Record<string, unknown>[];
};

function eur(value: number): string {
  return `${new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value ?? 0)} €`;
}

function pct(value: number | null | undefined): string {
  if (value === null || value === undefined) return "-";
  return `${value.toFixed(1)} %`;
}

function getAlignment(align?: DocxColumn["align"]) {
  if (align === "right") return AlignmentType.RIGHT;
  if (align === "center") return AlignmentType.CENTER;
  return AlignmentType.LEFT;
}

function getSectionTableData(section: any): DocxTableData | null {
  if (!section.data) return null;

  switch (section.key) {
    case "chiffreAffaires":
      return {
        columns: [
          { key: "label", header: "Indicateur" },
          { key: "value", header: "Valeur", align: "right" },
        ],
        rows: [
          {
            label: "Chiffre d’affaires budgété",
            value: eur(section.data.totalBudgetEur),
          },
          {
            label: "Chiffre d’affaires réalisé",
            value: eur(section.data.totalRealizedEur),
          },
          {
            label: "Écart",
            value: eur(section.data.ecartEur),
          },
          {
            label: "Taux de réalisation",
            value: pct(section.data.pctRealise),
          },
        ],
      };

    case "factures":
      return {
        columns: [
          { key: "label", header: "Indicateur" },
          { key: "value", header: "Montant HT", align: "right" },
        ],
        rows: [
          { label: "Factures émises", value: eur(section.data.emisesEur) },
          { label: "Factures payées", value: eur(section.data.payeesEur) },
          {
            label: "Factures en attente",
            value: eur(section.data.enAttenteEur),
          },
          {
            label: "Factures en retard",
            value: eur(section.data.enRetardEur),
          },
        ],
      };

    case "achats":
      return {
        columns: [
          { key: "label", header: "Indicateur" },
          { key: "value", header: "Valeur", align: "right" },
        ],
        rows: [
          { label: "Achats budgétés", value: eur(section.data.totalBudgetEur) },
          {
            label: "Achats réalisés",
            value: eur(section.data.totalRealizedEur),
          },
          { label: "Écart", value: eur(section.data.ecartEur) },
          {
            label: "Taux de réalisation",
            value: pct(section.data.pctRealise),
          },
        ],
      };

    case "tresorerie":
      return {
        columns: [
          { key: "nom", header: "Compte" },
          { key: "inclusGlobal", header: "Inclus global", align: "center" },
          { key: "solde", header: "Solde", align: "right" },
        ],
        rows: [
          ...section.data.comptes.map((compte: any) => ({
            nom: compte.nom,
            inclusGlobal: compte.inclusGlobal ? "Oui" : "Non",
            solde: eur(compte.soldeEur),
          })),
          {
            nom: "Total global",
            inclusGlobal: "",
            solde: eur(section.data.soldeGlobalEur),
          },
          ...(section.data.tva
            ? [
                {
                  nom: "TVA collectée",
                  inclusGlobal: "",
                  solde: eur(section.data.tva.tvaCollecteeEur),
                },
                {
                  nom: "TVA déductible",
                  inclusGlobal: "",
                  solde: eur(section.data.tva.tvaDeductibleEur),
                },
                {
                  nom: "TVA déjà payée",
                  inclusGlobal: "",
                  solde: eur(section.data.tva.tvaDejaPayeeEur),
                },
                {
                  nom: "TVA à payer",
                  inclusGlobal: "",
                  solde: eur(section.data.tva.tvaRestanteEur),
                },
              ]
            : []),
        ],
      };

    case "remboursements":
      return {
        columns: [
          { key: "label", header: "Indicateur" },
          { key: "value", header: "Montant", align: "right" },
        ],
        rows: [
          {
            label: "Montant à rembourser",
            value: eur(section.data.toRefundAmount),
          },
          {
            label: "Remboursé",
            value: eur(section.data.refundedAmount),
          },
          {
            label: "Reste à rembourser",
            value: eur(section.data.remainingAmount),
          },
        ],
      };

    case "syntheseFiscale":
      return {
        columns: [
          { key: "libelle", header: "Famille fiscale" },
          { key: "montant", header: "Montant", align: "right" },
        ],
        rows: [
          ...section.data.rows.map((row: any) => ({
            libelle: row.libelle,
            montant: eur(row.montantEur),
          })),
          {
            libelle: "Total",
            montant: eur(section.data.totalEur),
          },
        ],
      };

    case "bilanFinancier":
      return {
        columns: [
          { key: "indicateur", header: "Indicateur" },
          { key: "budget", header: "Selon budget", align: "right" },
          { key: "toDate", header: "Bilan à date", align: "right" },
        ],
        rows: section.data.rows.map((row: any) => ({
          indicateur: row.indicateur,
          budget: eur(row.budgetEur),
          toDate: eur(row.toDateEur),
        })),
      };

    default:
      return null;
  }
}

function tableFromTableData(data: DocxTableData): FileChild[] {
  return [
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: data.columns.map(
            (col) =>
              new TableCell({
                children: [
                  new Paragraph({
                    alignment: getAlignment(col.align),
                    children: [
                      new TextRun({
                        text: col.header,
                        bold: true,
                      }),
                    ],
                  }),
                ],
              }),
          ),
        }),

        ...data.rows.map(
          (row) =>
            new TableRow({
              children: data.columns.map((col) => {
                const value = row[col.key];

                return new TableCell({
                  children: [
                    new Paragraph({
                      text: String(value ?? ""),
                      alignment: getAlignment(col.align),
                    }),
                  ],
                });
              }),
            }),
        ),
      ],
    }),
  ];
}

export async function generateRapportDocx(
  viewModel: RapportFinancierViewModel,
): Promise<Buffer> {
  const sectionChildren = viewModel.sections
    .filter((section) => section.visible && section.hasData)
    .flatMap((section) => {
      const tableData = getSectionTableData(section);

      if (!tableData || tableData.rows.length === 0) {
        return [];
      }

      return [
        new Paragraph({
          text: section.title,
          heading: "Heading2",
          spacing: { before: 300, after: 100 },
        }),
        ...tableFromTableData(tableData),
      ];
    });

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: `${viewModel.clientName} - Rapport financier`,
            heading: "Heading1",
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: `Exercice : ${viewModel.exercice}        Date : ${viewModel.dateEdition}`,
            spacing: { after: 300 },
          }),
          ...sectionChildren,
        ],
      },
    ],
  });

  return Packer.toBuffer(doc);
}