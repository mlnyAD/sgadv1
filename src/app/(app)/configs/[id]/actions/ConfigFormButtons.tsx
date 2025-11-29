"use client";

import { useRouter } from "next/navigation";
import { CloseButton } from "@/components/Buttons/CloseButton";
import { SaveButton } from "@/components/Buttons/SaveButton";


export default function ConfigFormButtons({
  onValidate,
}: {
  onValidate: () => void;
}) {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <CloseButton onClick={() => router.push("/configs")} />
      <SaveButton label="Valider la configuration" onClick={onValidate} />
    </div>
  );
}
