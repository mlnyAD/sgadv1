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

const FONT_SIZE = 24; // 12pt

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
	return `${new Intl.NumberFormat("fr-FR").format(value ?? 0)} €`;
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

function textRun(text: string, bold = false) {
	return new TextRun({
		text,
		bold,
		size: FONT_SIZE,
	});
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
					{ label: "CA budgété", value: eur(section.data.totalBudgetEur) },
					{ label: "CA réalisé", value: eur(section.data.totalRealizedEur) },
					{ label: "Écart", value: eur(section.data.ecartEur) },
					{ label: "Taux", value: pct(section.data.pctRealise) },
				],
			};

		case "factures":
			return {
				columns: [
					{ key: "label", header: "Indicateur" },
					{ key: "value", header: "Montant", align: "right" },
				],
				rows: [
					{ label: "Émises", value: eur(section.data.emisesEur) },
					{ label: "Payées", value: eur(section.data.payeesEur) },
					{ label: "En attente", value: eur(section.data.enAttenteEur) },
					{ label: "En retard", value: eur(section.data.enRetardEur) },
				],
			};

		case "achats":
			return {
				columns: [
					{ key: "label", header: "Indicateur" },
					{ key: "value", header: "Valeur", align: "right" },
				],
				rows: [
					{ label: "Budget", value: eur(section.data.totalBudgetEur) },
					{ label: "Réalisé", value: eur(section.data.totalRealizedEur) },
					{ label: "Écart", value: eur(section.data.ecartEur) },
					{ label: "Taux", value: pct(section.data.pctRealise) },
				],
			};

		case "remboursements":
			return {
				columns: [
					{ key: "label", header: "Indicateur" },
					{ key: "value", header: "Montant", align: "right" },
				],
				rows: [
					{ label: "À rembourser", value: eur(section.data.toRefundAmount) },
					{ label: "Remboursé", value: eur(section.data.refundedAmount) },
					{ label: "Reste", value: eur(section.data.remainingAmount) },
				],
			};

		case "syntheseFiscale":
			return {
				columns: [
					{ key: "libelle", header: "Famille" },
					{ key: "montant", header: "Montant", align: "right" },
				],
				rows: [
					...section.data.rows.map((r: any) => ({
						libelle: r.libelle,
						montant: eur(r.montantEur),
					})),
					{ libelle: "Total", montant: eur(section.data.totalEur) },
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

function tableFromData(data: DocxTableData): FileChild[] {
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
										children: [textRun(col.header, true)],
									}),
								],
							}),
					),
				}),
				...data.rows.map(
					(row) =>
						new TableRow({
							children: data.columns.map((col) => {
								const value = String(row[col.key] ?? "");
								return new TableCell({
									children: [
										new Paragraph({
											alignment: getAlignment(col.align),
											children: [textRun(value)],
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

function buildTwoColumns(blocks: FileChild[][]): FileChild[] {
	const rows: TableRow[] = [];

	for (let i = 0; i < blocks.length; i += 2) {
		rows.push(
			new TableRow({
				children: [
					new TableCell({
						width: { size: 50, type: WidthType.PERCENTAGE },
						children: blocks[i],
					}),
					new TableCell({
						width: { size: 50, type: WidthType.PERCENTAGE },
						children: blocks[i + 1] ?? [new Paragraph("")],
					}),
				],
			}),
		);
	}

	return [
		new Table({
			width: { size: 100, type: WidthType.PERCENTAGE },
			rows,
		}),
	];
}

export async function generateRapportDocx(
	viewModel: RapportFinancierViewModel,
): Promise<Buffer> {
	const blocks = viewModel.sections
		.filter((s) => s.visible && s.hasData)
		.map((section) => {
			const data = getSectionTableData(section);
			if (!data || data.rows.length === 0) return null;

			return [
				new Paragraph({
					children: [textRun(section.title, true)],
					spacing: { after: 100 },
				}),
				...tableFromData(data),
			];
		})
		.filter(Boolean) as FileChild[][];

	const doc = new Document({
		sections: [
			{
				children: [
					new Paragraph({
						children: [textRun(`${viewModel.clientName} - Rapport financier`, true)],
						spacing: { after: 200 },
					}),
					new Paragraph({
						children: [
							textRun(
								`Exercice : ${viewModel.exercice}        Date : ${viewModel.dateEdition}`,
							),
						],
						spacing: { after: 300 },
					}),
					...buildTwoColumns(blocks),
				],
			},
		],
	});

	return Packer.toBuffer(doc);
}