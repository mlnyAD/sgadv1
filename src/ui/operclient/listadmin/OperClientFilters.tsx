

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  operateur: string | null;
  client: string | null;
  onChange: (next: {
    operateur?: string | null;
    client?: string | null;
  }) => void;
}

export function OperClientFilters({
  operateur,
  client,
  onChange,
}: Props) {
  return (
    <div className="flex items-end gap-2">
      {/* Filtre opérateur */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">
          Opérateur
        </label>
        <Input
          placeholder="Nom ou email"
          value={operateur ?? ""}
          onChange={(e) =>
            onChange({
              operateur: e.target.value || null,
              client,
            })
          }
          className="h-9 w-48"
        />
      </div>

      {/* Filtre client */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">
          Client
        </label>
        <Input
          placeholder="Nom du client"
          value={client ?? ""}
          onChange={(e) =>
            onChange({
              operateur,
              client: e.target.value || null,
            })
          }
          className="h-9 w-48"
        />
      </div>

      {/* Reset */}
      {(operateur || client) && (
        <Button
          variant="ghost"
          onClick={() =>
            onChange({
              operateur: null,
              client: null,
            })
          }
        >
          Réinitialiser
        </Button>
      )}
    </div>
  );
}
