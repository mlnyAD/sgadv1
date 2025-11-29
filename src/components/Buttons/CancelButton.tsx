"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type CancelButtonProps = React.ComponentProps<typeof Button> & {
  label?: string;
};

export function CancelButton({ label = "Annuler", ...props }: CancelButtonProps) {
  return (
    <Button
      variant="secondary"
      {...props}
      className={"flex items-center gap-2 " + (props.className ?? "")}
    >
      <X className="h-4 w-4" />
      {label}
    </Button>
  );
}
