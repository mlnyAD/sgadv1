"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function ConfigListToastFeedback({
  flags,
}: {
  flags: {
    created: boolean;
    updated: boolean;
    deleted: boolean;
    deleteError: boolean;
  };
}) {
  useEffect(() => {
    if (flags.created) toast.success("Configuration créée");
    if (flags.updated) toast.success("Configuration mise à jour");
    if (flags.deleted) toast.success("Configuration supprimée");
    if (flags.deleteError) toast.error("Erreur lors de la suppression");
  }, [flags]);

  return null;
}
