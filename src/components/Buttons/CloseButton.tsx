"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function CloseButton(props: React.ComponentProps<typeof Button>) {

  return (
    <Button variant="outline" {...props}>
      <X className="h-4 w-4" />
      Fermer
    </Button>
  );
}
