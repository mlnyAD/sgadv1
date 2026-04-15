

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type DbReleaseView = {
  id: string;
  name: string;
  version: string;
  date: string;
  comment: string;
  current: boolean;
};

export function AboutDbVersionsAccordion({
  releases,
}: {
  releases: DbReleaseView[];
}) {
  const current = releases.find((r) => r.current) ?? releases[0] ?? null;
  const history = releases.filter((r) => !current || r.id !== current.id);

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="db-current"
      className="w-full"
    >
      <AccordionItem value="db-current">
        <AccordionTrigger>
          Dernière version base de données
        </AccordionTrigger>
        <AccordionContent>
          {current ? (
            <div className="rounded-lg border bg-white dark:bg-black p-4 shadow-sm">
              <p className="mt-2 text-sm font-medium">
                {current.name} - Version {current.version} du {current.date}
              </p>
              <p className="text-xs">{current.comment}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Aucune information disponible.
            </p>
          )}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="db-history">
        <AccordionTrigger>Historique base de données</AccordionTrigger>
        <AccordionContent>
          {history.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucun historique disponible.
            </p>
          ) : (
            history.map((item) => (
              <div key={item.id} className="mb-4">
                <p className="mt-2 text-sm font-medium">
                  {item.name} - Version {item.version} du {item.date}
                </p>
                <p className="text-xs">{item.comment}</p>
              </div>
            ))
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}