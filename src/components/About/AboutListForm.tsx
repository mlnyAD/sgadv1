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
import { CloseWindow } from "@/components/IHM/CloseWindow";

export default function AboutListForm() {
  // Lecture des variables du .env
  const version = process.env.NEXT_PUBLIC_VERSION ?? "N/C";
  const date = process.env.NEXT_PUBLIC_DATE ?? "N/C";

  const projectName = process.env.NEXT_PUBLIC_PROJECTNAME ?? "Application";
  const description =
    process.env.NEXT_PUBLIC_PROJECTDESCRIPTION ?? "Description";

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
                  <p className="text-2xl text-red-500">
                    Version {version} — {date}
                  </p>
                  <p className="text-xs">1 - Reprise de la transaction configuration</p>
                  <p className="text-xs">2 - Reprise look and feel + sidebar menu</p>
                </AccordionContent>
              </AccordionItem>

              {/* HISTORIQUE */}
              <AccordionItem value="history">
                <AccordionTrigger>Historique</AccordionTrigger>
                <AccordionContent>
                  <p className="text-2xl text-red-500">Version 1.00 du 18/11/2025</p>
									<p className="text-xs">1 - Reprise de l&apos;application</p>
                  <p className="text-xs">2 - Reprise du login avec cookies</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>

          <CardFooter>
            <CloseWindow />
          </CardFooter>
        </Card>
      </ScrollArea>
    </div>
  );
}
