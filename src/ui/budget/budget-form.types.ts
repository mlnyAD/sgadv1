

// src/ui/budget/budget-form.types.ts

export interface BudgetFormValues {
	id: string;

	clientId: string;
	clientNom: string | null;

	centrecoutId: string | null
	centrecoutCode: string | null

	kind: string

	exerId: string
	exerCode: string

	operId: string
	operNom: string

	debut: string; // YYYY-MM-DD (ou ISO)
	fin: string;   // YYYY-MM-DD (ou ISO)

	revenueTypeId: number | null
	revenueTypeNom: string | null

	amountHTEur: number

	created_at: string
	updated_at: string
}
