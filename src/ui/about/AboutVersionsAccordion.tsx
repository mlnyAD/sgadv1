

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
						<p className="mt-2 text-sm font-medium">Version 1.21.2 du 22/04/2026	</p>
						<p className="text-xs">1 - Reprise de l'IHM afin que les listes prennent toute la largeur de l'écran</p>
					</div>
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="history">
				<AccordionTrigger>Historique</AccordionTrigger>
				<AccordionContent>
						<p className="mt-2 text-sm font-medium">Version 1.21.1 du 19/04/2026	</p>
						<p className="text-xs">1 - Reprise de la base de données pour la date de paiement des factures émises</p>
						<p className="mt-2 text-sm font-medium">Version 1.21 du 19/04/2026	</p>
						<p className="text-xs">1 - Correction de la gestion date paiment facture</p>
						<p className="text-xs">2 - Correction de l'affichage dans le dashboard'</p>
						<p className="mt-2 text-sm font-medium">Version 1.20 du 19/04/2026	</p>
						<p className="text-xs">1 - Reprise de la transaction Choix du client</p>
						<p className="mt-2 text-sm font-medium">Version 1.19 du 18/04/2026	</p>
						<p className="text-xs">1 - Affichage dashboard selon client</p>
						<p className="text-xs">2 - Affichage dashboard depuis le logo et barre de menus</p>
						<p className="mt-2 text-sm font-medium">Version 1.18 du 17/04/2026	</p>
						<p className="text-xs">1 - Ajout filtres sur Achats, Ventes, Sociétés</p>
						<p className="text-xs">2 - Préremplissage de certains champs lors de la saisie</p>
					<p className="mt-2 text-sm font-medium">Version 1.17.5 du 16/04/2026	</p>
					<p className="text-xs">1 - Correction Sidebar</p>
					<p className="mt-2 text-sm font-medium">Version 1.17.4 du 15/04/2026	</p>
					<p className="text-xs">1 - Debug accès BD côté applicatif</p>
					<p className="text-xs">2 - Ajout About BD</p>
					<p className="text-xs">3 - Ajout affihage profile</p>
					<p className="mt-2 text-sm font-medium">Version 1.17.2 du 14/04/2026	</p>
					<p className="text-xs">1 - Correction server-read.ts strictement read.</p>
					<p className="mt-2 text-sm font-medium">Version 1.17.1 du 14/04/2026	</p>
					<p className="text-xs">1 - Neutralisation server.ts en le transformant en simple alias vers server-read.</p>
					<p className="mt-2 text-sm font-medium">Version 1.17 du 12/04/2026	</p>
					<p className="text-xs">1 - Mise à niveau sécurité (appels Supabase) </p>
					<p className="text-xs">selon adminSys ou opérateur 					</p>
					<p className="text-xs">2 - Ajout de la suppression des opérateurs 	</p>
					<p className="mt-2 text-sm font-medium">Version 1.16 du 11/04/2026</p>
					<p className="text-xs">1 - Mise en place filtres sur centres de coût </p>
					<p className="text-xs">2 - Reprise dashboard et budget </p>
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
