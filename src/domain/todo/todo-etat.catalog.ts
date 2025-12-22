
		/* Etats d'un TODO */
export const TODO_ETAT_CATALOG = [
	{	id: 1,	label: "En cours",},
	{	id: 2,	label: "Terminé",},
	{	id: 3,	label: "Abandonné",},
	{	id: 4,	label: "Suspendue",},
] as const;	
		
export type TodoEtatId = (typeof TODO_ETAT_CATALOG )[number]["id"];


/**
 * Type guard métier
 */
export function isTodoEtatId(value: number): value is TodoEtatId {
  return TODO_ETAT_CATALOG.some((e) => e.id === value);
}