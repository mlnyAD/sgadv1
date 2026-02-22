

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
					<div className="mt-2 rounded-lg border bg-white dark:bg-black p-4 shadow-sm">
						<p className="text-xl text-red-500">Version 1.6 du 22/02/2026</p>
						<p className="mt-2 text-xs">1 - Ajout transaction Comptes </p>
					</div>
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="history">
				<AccordionTrigger>Historique</AccordionTrigger>
				<AccordionContent>
					<p className="text-xl text-red-500">Version 1.5 du 21/02/2026</p>
					<p className="mt-2 text-xs">1 - Ajout du dashboard </p>
					<p>---------------</p>
					<p className="text-xl text-red-500">Version 1.4 du 20/02/2026</p>
					<p className="mt-2 text-xs">1 - Ajout transaction budget  </p>
					<p>---------------</p>
					<p className="text-xl text-red-500">Version 1.3 du 18/02/2026</p>
					<p className="mt-2 text-xs">1 - Ajout transaction factures  </p>
					<p>---------------</p>
					<p className="text-xl text-red-500">Version 1.2 du 15/02/2026</p>
					<p className="mt-2 text-xs">1 - Remise à niveau transactions AdminSys </p>
					<p className="mt-2 text-xs">2 - Ajout transactions centre de cout, exercices société  </p>
					<p className="mt-2 text-xs">3 - Retrait transaction ToDo  </p>
					<p>---------------</p>
					<p className="text-xl text-red-500">Version 1.1.1 du 08/02/2026</p>
					<p className="mt-2 text-xs">1 - Opérateur multi-clients </p>
					<p>---------------</p>
					<p className="text-xl text-red-500">Version 1.1.0 du 06/02/2026</p>
					<p className="mt-2 text-xs">1 - version avec les transactions admin Système </p>
					<p className="mt-2 text-xs">2 - 1ère version exercice, centres de coût </p>
					<p>---------------</p>
					<p className="text-xl text-red-500">Version 1.0.0 du 16/01/2026</p>
					<p className="mt-2 text-xs">1 - Version initale </p>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
