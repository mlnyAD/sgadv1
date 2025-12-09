"use client";

import {
  Card,
  CardContent,
  CardDescription,
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
import { TableTitle } from "@/components/IHM/TableTitle";
import { CloseButton } from "@/components/Buttons/CloseButton";
import { useRouter } from "next/navigation";
import { APP_VERSION, APP_VERSION_DATE, APP_PROJECTNAME, APP_PROJECTDESCRIPTION } from "@/version";

export default function AboutListForm() {
  // Lecture des variables du .env
  const version = APP_VERSION ?? "N/C";
  const date = APP_VERSION_DATE ?? "N/C";

  const projectName = APP_PROJECTNAME ?? "Application";
  const description = APP_PROJECTDESCRIPTION ?? "Description";

  const router = useRouter();
  return (
    <div className="flex size-full flex-col items-center justify-center bg-inherit">
      {/* Titre de la page */}
      <TableTitle>À propos ...</TableTitle>

      <ScrollArea className="w-full overflow-x-auto">
        <Card className="m-5 w-5/6">
          <CardHeader>
            <CardTitle className="text-2xl underline">{projectName}</CardTitle>
            <CardDescription className="text-xs dark:text-white">
              {description}
            </CardDescription>
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
                <AccordionTrigger>Version en cours</AccordionTrigger>
                <AccordionContent>
                  <div className="mt-2 rounded-lg border bg-white dark:bg-black p-4 shadow-sm">
                    <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                      Version {version}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Build du {date}
                    </div>
                  </div>
                  <p className="mt-2 text-xs">1 - Correction au niveau sidebar</p>
                  <p className="mt-2 text-xs">2 - mise à niveau transaction configs</p>
                </AccordionContent>
              </AccordionItem>

              {/* HISTORIQUE */}
              <AccordionItem value="history">
                <AccordionTrigger>Historique</AccordionTrigger>
                <AccordionContent>
                  <p className="text-2xl text-red-500">Version 1.04.01 du 07/12/2025</p>
                  <p className="mt-2 text-xs">1 - Correction au niveau sidebar</p>
                  <p className="text-2xl text-red-500">Version 1.04 du 05/12/2025</p>
                  <p className="mt-2 text-xs">1 - Connexion des utilisateurs</p>
                  <p className="text-xs">2 - Mise à niveau base (public et auth)</p>
                  <p className="text-2xl text-red-500">Version 1.03 du 04/12/2025</p>
                  <p className="mt-2 text-xs">1 - Reprise de la Base de données</p>
                  <p className="text-xs">2 - Interfaces, types et enums</p>
                  <p className="text-2xl text-red-500">Version 1.02 du 26/11/2025</p>
                  <p className="mt-2 text-xs">1 - Finalisation de la transaction configuration</p>
                  <p className="text-xs">2 - Boutons génériques</p>
                  <p className="text-2xl text-red-500">Version 1.01 du 26/11/2025</p>
                  <p className="mt-2 text-xs">1 - Reprise de la transaction configuration</p>
                  <p className="text-xs">2 - Reprise look and feel + sidebar menu</p>
   
                  <p className="text-2xl text-red-500">Version 1.00 du 18/11/2025</p>
                  <p className="text-xs">1 - Reprise de l&apos;application</p>
                  <p className="text-xs">2 - Reprise du login avec cookies</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>

          <CardFooter>
            <CloseButton onClick={() => router.push("/dashboard")} />
          </CardFooter>
        </Card>
      </ScrollArea>
    </div>
  );
}
