"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

type SaveButtonProps = React.ComponentProps<typeof Button> & {
  label?: string;
  loading?: boolean;
};

export function SaveButton({
  label = "Enregistrer",
  loading = false,
  ...props
}: SaveButtonProps) {
  return (
    <Button
      variant="axcio"
      disabled={loading || props.disabled}
      {...props}
      className={"flex items-center gap-2 " + (props.className ?? "")}
    >
      <Check className="h-4 w-4" />
      {loading ? "Enregistrement..." : label}
    </Button>
  );
}
