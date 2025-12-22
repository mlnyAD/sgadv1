/* Type d'un risque */
export const RISK_TYPE_ENUM = [
	{	id: 1,	label: "Risque",},
	{	id: 2,	label: "Opportunité",},
] as const;

/* Types de risques */
export const RISK_CLASS_ENUM = [
	{	id: 1,	label: "Planning",},
	{	id: 2,	label: "Economique",},
	{	id: 3,	label: "Juridique",},
	{	id: 4,	label: "Communication",},
	{	id: 5,	label: "Organisation",},
	{	id: 6,	label: "Projet",			},
	{	id: 7,	label: "Entreprise",},
	{	id: 11,	label: "Technique",},
	{	id: 12,	label: "Sous-traitance",},
	{	id: 13,	label: "Humain",},
	{	id: 14,	label: "Délais",},
	{	id: 15,	label: "Autres",},
] as const;

/* Gravité d'un risque */
export const RISK_GRAVITY_ENUM = [
	{	id: 1,	label: "Mineur",},
	{	id: 2,	label: "Significatif",},
	{	id: 3,	label: "Critique",},
	{	id: 4,	label: "Catastrophique",},
] as const;

/* Impact d'un risque */
export const RISK_IMPACT_ENUM = [
	{	id: 1,	label: "Coût",},
	{	id: 2,	label: "Délai",},
	{	id: 3,	label: "Réalisation",},
	{	id: 4,	label: "Qualité",},
] as const;

/* Origine d'un risque */
export const RISK_ORIGIN_ENUM = [
	{	id: 1,	label: "Interne",},
	{	id: 2,	label: "Externe",},
] as const;

/* Probabilité d'un risque */
export const RISK_PROBABILITY_ENUM = [
	{	id: 1,	label: "Très peu probable",},
	{	id: 2,	label: "Peu probable",},
	{	id: 3,	label: "Probable",},
	{	id: 4,	label: "Très probable",},
] as const;