

"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export function AboutVersionsAccordion() {
	return (
		<Accordion
			type="single"
			collapsible
			defaultValue="version"
			className="w-full"
		>
			<AccordionItem value="version">
				<AccordionTrigger>
					Dernière version en ligne
				</AccordionTrigger>
				<AccordionContent>
					<div className="rounded-lg border bg-white dark:bg-black p-4 shadow-sm">
						<p className="mt-2 text-sm font-medium">Version 1.16 du 11/04/2026</p>
						<p className="text-xs">1 - Mise en place filtres sur centres de coût </p>
						<p className="text-xs">2 - Reprise dashboard et budget </p>
					</div>
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="history">
				<AccordionTrigger>Historique</AccordionTrigger>
				<AccordionContent>
					<p className="mt-2 text-sm font-medium">Version 1.15 du 06/04/2026</p>
					<p className="text-xs">1 - Séparation des Ventes et des Achats </p>
					<p className="text-xs">et reprise des transactions impactées </p>
					<p className="mt-2 text-sm font-medium">Version 1.14 du 09/03/2026</p>
					<p className="text-xs">1 - Reprise du n° de version </p>
					<p className="mt-2 text-sm font-medium">Version 1.13 du 08/03/2026</p>
					<p className="text-xs">1 - Logo dans sidebarMenu </p>
					<p className="mt-2 text-sm font-medium">Version 1.12 du 08/03/2026</p>
					<p className="text-xs">1 - transaction export (initiale) </p>
					<p className="mt-2 text-sm font-medium">Version 1.11 du 07/03/2026</p>
					<p className="text-xs">1 - Correction : erreurs taille graphes </p>
					<p className="text-xs">2 - Correction : sélection du client au démarrage </p>
					<p className="text-xs">3 - ajout skeleton dans le layout global (sidebar) </p>
					<p className="mt-2 text-sm font-medium">Version 1.10 du 26/02/2026</p>
					<p className="text-xs">1 - Ajout transaction bilan </p>
					<p className="mt-2 text-sm font-medium">Version 1.9 du 26/02/2026</p>
					<p className="text-xs">1 - Ajout transaction Remboursements </p>
					<p className="mt-2 text-sm font-medium">Version 1.8 du 25/02/2026</p>
					<p className="text-xs">1 - Ajout transaction Fisc </p>
					<p className="mt-2 text-sm font-medium">Version 1.7 du 22/02/2026</p>
					<p className="text-xs">1 - Ajout transaction Trésorerie </p>
					<p className="mt-2 text-sm font-medium">Version 1.6 du 22/02/2026</p>
					<p className="text-xs">1 - Ajout transaction Comptes </p>
					<p className="mt-2 text-sm font-medium">Version 1.5 du 21/02/2026</p>
					<p className="text-xs">1 - Ajout du dashboard </p>
					<p className="mt-2 text-sm font-medium">Version 1.4 du 20/02/2026</p>
					<p className="text-xs">1 - Ajout transaction budget  </p>
					<p className="mt-2 text-sm font-medium">Version 1.3 du 18/02/2026</p>
					<p className="text-xs">1 - Ajout transaction factures  </p>
					<p className="mt-2 text-sm font-medium">Version 1.2 du 15/02/2026</p>
					<p className="text-xs">1 - Remise à niveau transactions AdminSys </p>
					<p className="text-xs">2 - Ajout transactions centre de cout, exercices société  </p>
					<p className="text-xs">3 - Retrait transaction ToDo  </p>
					<p className="mt-2 text-sm font-medium">Version 1.1.1 du 08/02/2026</p>
					<p className="text-xs">1 - Opérateur multi-clients </p>
					<p className="mt-2 text-sm font-medium">Version 1.1.0 du 06/02/2026</p>
					<p className="text-xs">1 - version avec les transactions admin Système </p>
					<p className="text-xs">2 - 1ère version exercice, centres de coût </p>
					<p className="mt-2 text-sm font-medium">Version 1.0.0 du 16/01/2026</p>
					<p className="text-xs">1 - Version initale </p>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
