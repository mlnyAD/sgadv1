"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ConfigFormButtons({
  onValidate,
}: {
  onValidate: () => void;
}) {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant="secondary"
        onClick={() => router.push("/configs")}
      >
        Annuler
      </Button>

      <Button type="button" variant="destructive" onClick={onValidate}>
        Valider
      </Button>
    </div>
  );
}
