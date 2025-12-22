"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ScrollArea } from "@/components/ui/scroll-area"; // plus propre que Radix direct
import { TableHeader } from "@/components/transaction/TableHeader";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function AboutListForm() {
  // Lecture des variables du .env
  const version = process.env.NEXT_PUBLIC_APP_VERSION ?? "N/C";
  const date = process.env.NEXT_PUBLIC_APP_VERSION_DATE ?? "N/C";

  const projectName = process.env.NEXT_PUBLIC_APP_PROJECTNAME ?? "Application";
  const description = process.env.NEXT_PUBLIC_APP_PROJECTDESCRIPTION ?? "Description";

  const router = useRouter();
  return (
    <div className="mx-auto w-6/6 space-y-4">
      {/* Titre de la page */}
      <TableHeader 
        title={`${projectName} - Version ${version} du ${date}`}
        subtitle={`${description}`}
      />

      <ScrollArea className="w-full overflow-x-auto">
        <Card className=" w-6/6">
          <CardHeader>
            <CardTitle className="text-2xl">Liste des points corrigés/apportés par version</CardTitle>
          </CardHeader>

          <CardContent>
            <Accordion
              type="single"
              collapsible
              defaultValue="version"
              className="w-full"
            >
              {/* VERSION ACTUELLE */}
              <AccordionItem value="version">
                <AccordionTrigger>Dernière version en ligne</AccordionTrigger>
                <AccordionContent>
                  <div className="mt-2 rounded-lg border bg-white dark:bg-black p-4 shadow-sm">
                    <p className="text-xl text-red-500">Version 1.07 du 22/12/2025</p>
                    <p className="mt-2 text-xs">1 - Todo liste</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* HISTORIQUE */}
              <AccordionItem value="history">
                <AccordionTrigger>Historique</AccordionTrigger>
                <AccordionContent>
                    <p className="text-xl text-red-500">Version 1.06.03 du 20/12/2025</p>
                    <p className="mt-2 text-xs">1 - Corrections mineures pour le déploiement</p>
                  <p className="text-xl text-red-500">Version 1.06.02 du 20/12/2025</p>
                  <p className="mt-2 text-xs">1 - Corrections mineures pour le déploiement</p>
                  <p className="text-xl text-red-500">Version 1.06.01 du 20/12/2025</p>
                  <p className="mt-2 text-xs">1 - Corrections mineures pour le déploiement</p>
                  <p className="text-xl text-red-500">Version 1.06 du 19/12/2025</p>
                  <p className="mt-2 text-xs">1 - Version stable operateurs (contacts)</p>
                  <p className="mt-2 text-xs">2 - Version stable configurations</p>
                  <p className="text-xl text-red-500">Version 1.05 du 10/12/2025</p>
                  <p className="mt-2 text-xs">1 - Version stable avec sidebar, header, config</p>
                  <p className="text-xl text-red-500">Version 1.04.02 du 09/12/2025</p>
                  <p className="mt-2 text-xs">1 - Correction au niveau sidebar</p>
                  <p className="mt-2 text-xs">2 - mise à niveau transaction configs</p>
                  <p className="text-xl text-red-500">Version 1.04.01 du 07/12/2025</p>
                  <p className="mt-2 text-xs">1 - Correction au niveau sidebar</p>
                  <p className="text-xl text-red-500">Version 1.04 du 05/12/2025</p>
                  <p className="mt-2 text-xs">1 - Connexion des utilisateurs</p>
                  <p className="text-xs">2 - Mise à niveau base (public et auth)</p>
                  <p className="text-xl text-red-500">Version 1.03 du 04/12/2025</p>
                  <p className="mt-2 text-xs">1 - Reprise de la Base de données</p>
                  <p className="text-xs">2 - Interfaces, types et enums</p>
                  <p className="text-xl text-red-500">Version 1.02 du 26/11/2025</p>
                  <p className="mt-2 text-xs">1 - Finalisation de la transaction configuration</p>
                  <p className="text-xs">2 - Boutons génériques</p>
                  <p className="text-xl text-red-500">Version 1.01 du 26/11/2025</p>
                  <p className="mt-2 text-xs">1 - Reprise de la transaction configuration</p>
                  <p className="text-xs">2 - Reprise look and feel + sidebar menu</p>
                  <p className="text-xl text-red-500">Version 1.00 du 18/11/2025</p>
                  <p className="text-xs">1 - Reprise de l&apos;application</p>
                  <p className="text-xs">2 - Reprise du login avec cookies</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button
              variant="axcio"
              onClick={() => router.push("/dashboard")} >
              Fermer
            </Button>
          </CardFooter>
        </Card>
      </ScrollArea>
    </div>
  );
}
