

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
            <p className="text-xl text-red-500">Version 1.0.0 du 16/01/2026</p>
            <p className="mt-2 text-xs">1 - Version initale </p>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="history">
        <AccordionTrigger>Historique</AccordionTrigger>
        <AccordionContent>
          <p>---------------</p>
          <p className="text-sm text-red-500">Version 1.00 du 18/11/2025</p>
          <p className="text-xs">1 - Reprise de l&apos;application</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
