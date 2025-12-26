		/* Rôles d'une société */
export const SOCIETE_TYPE_CATALOG = [
	{	id: 1,	label: "MOE",},
	{	id: 2,	label: "MOA",},
	{	id: 3,	label: "MOA déléguée",},
	{	id: 4,	label: "Donneur d'ordre",},
	{	id: 5,	label: "Sous-traitant",},
	{	id: 6,	label: "Fournisseur",},
] as const;

export type SocieteTypeId = (typeof SOCIETE_TYPE_CATALOG )[number]["id"];