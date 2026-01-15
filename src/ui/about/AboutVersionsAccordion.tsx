

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
            <p className="text-xl text-red-500">Version 1.15 du 15/01/2026</p>
            <p className="mt-2 text-xs">1 - Nouvelle transaction : Tâches refactorisé </p>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="history">
        <AccordionTrigger>Historique</AccordionTrigger>
        <AccordionContent>
            <p className="text-sm text-red-500">Version 1.14 du 13/01/2026</p>
            <p className="mt-2 text-xs">1 - Nouvelle transaction : Lots de travaux refactorisé </p>
            <p className="mt-2 text-xs">2 - About refactorisé </p>
          <p className="text-sm text-red-500">Version 1.13 du 13/01/2026</p>
          <p className="mt-2 text-xs">1 - Nouvelle transaction : Lots de travaux</p>
          <p>---------------</p>
          <p className="text-sm text-red-500">Version 1.12 du 10/01/2026</p>
          <p className="mt-2 text-xs">1 - Nouvelle transaction : Projets</p>
          <p>---------------</p>
          <p className="text-sm text-red-500">Version 1.11 du 06/01/2026</p>
          <p className="mt-2 text-xs">1 - Nouvelle transaction : Licences</p>
          <p>---------------</p>
          <p className="text-sm text-red-500">Version 1.10 du 05/01/2026</p>
          <p className="mt-2 text-xs">1 - Nouvelle transaction : Client</p>
          <p className="mt-2 text-xs">2 - Début intégration projet : liste + résumé</p>
          <p>---------------</p>

          <p className="text-sm text-red-500">Version 1.09 du 01/01/2026</p>
          <p className="mt-2 text-xs">1 - Transactions remaniées : Configuration, Societe, Todo</p>
          <p>---------------</p>

          <p className="text-sm text-red-500">Version 1.08.01 du 26/12/2025</p>
          <p className="mt-2 text-xs">1 - Transaction Sociétés optimisée</p>
          <p className="text-sm text-red-500">Version 1.08 du 26/12/2025</p>
          <p className="mt-2 text-xs">1 - Transaction Sociétés</p>
          <p>---------------</p>

          <p className="text-sm text-red-500">Version 1.07 du 22/12/2025</p>
          <p className="mt-2 text-xs">1 - Transaction Todo</p>
          <p>---------------</p>

          <p className="text-sm text-red-500">Version 1.06.03 du 20/12/2025</p>
          <p className="mt-2 text-xs">1 - Corrections mineures pour le déploiement</p>
          <p className="text-sm text-red-500">Version 1.06.02 du 20/12/2025</p>
          <p className="mt-2 text-xs">1 - Corrections mineures pour le déploiement</p>
          <p className="text-sm text-red-500">Version 1.06.01 du 20/12/2025</p>
          <p className="mt-2 text-xs">1 - Corrections mineures pour le déploiement</p>
          <p className="text-sm text-red-500">Version 1.06 du 19/12/2025</p>
          <p className="mt-2 text-xs">1 - Version stable operateurs (contacts)</p>
          <p className="mt-2 text-xs">2 - Version stable configurations</p>
          <p>---------------</p>

          <p className="text-sm text-red-500">Version 1.05 du 10/12/2025</p>
          <p className="mt-2 text-xs">1 - Version stable avec sidebar, header, config</p>
          <p>---------------</p>

          <p className="text-sm text-red-500">Version 1.04.02 du 09/12/2025</p>
          <p className="mt-2 text-xs">1 - Correction au niveau sidebar</p>
          <p className="mt-2 text-xs">2 - mise à niveau transaction configs</p>
          <p className="text-sm text-red-500">Version 1.04.01 du 07/12/2025</p>
          <p className="mt-2 text-xs">1 - Correction au niveau sidebar</p>
          <p className="text-sm text-red-500">Version 1.04 du 05/12/2025</p>
          <p className="mt-2 text-xs">1 - Connexion des utilisateurs</p>
          <p className="text-xs">2 - Mise à niveau base (public et auth)</p>
          <p>---------------</p>

          <p className="text-sm text-red-500">Version 1.03 du 04/12/2025</p>
          <p className="mt-2 text-xs">1 - Reprise de la Base de données</p>
          <p className="text-xs">2 - Interfaces, types et enums</p>
          <p>---------------</p>

          <p className="text-sm text-red-500">Version 1.02 du 26/11/2025</p>
          <p className="mt-2 text-xs">1 - Finalisation de la transaction configuration</p>
          <p className="text-xs">2 - Boutons génériques</p>
          <p>---------------</p>

          <p className="text-sm text-red-500">Version 1.01 du 26/11/2025</p>
          <p className="mt-2 text-xs">1 - Reprise de la transaction configuration</p>
          <p className="text-xs">2 - Reprise look and feel + sidebar menu</p>
          <p>---------------</p>

          <p className="text-sm text-red-500">Version 1.00 du 18/11/2025</p>
          <p className="text-xs">1 - Reprise de l&apos;application</p>
          <p className="text-xs">2 - Reprise du login avec cookies</p>
          <p>---------------</p>

        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
