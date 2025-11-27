"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export function CloseWindow() {
  const router = useRouter();

  function handleClose() {
    router.back(); // navigation propre App Router

    // Optionnel : recharger l'appelant si l'app était en popup
    if (window.opener && !window.opener.closed) {
      window.opener.location.reload();
    }
  }

  return (
    <Button variant="outline" onClick={handleClose} className="gap-2">
      <X className="h-4 w-4" />
      Fermer
    </Button>
  );
}
