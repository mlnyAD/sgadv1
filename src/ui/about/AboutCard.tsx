

"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AboutVersionsAccordion } from "./AboutVersionsAccordion";

export function AboutCard() {
  const router = useRouter();

  return (
    <ScrollArea className="w-full overflow-x-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">
            Liste des points corrigés / apportés par version
          </CardTitle>
        </CardHeader>

        <CardContent>
          <AboutVersionsAccordion />
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            variant="axcio"
            onClick={() => router.push("/dashboard")}
          >
            Fermer
          </Button>
        </CardFooter>
      </Card>
    </ScrollArea>
  );
}
