"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton(props: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="outline" {...props}>
      <ArrowLeft className="h-4 w-4" />
      Retour
    </Button>
  );
}
