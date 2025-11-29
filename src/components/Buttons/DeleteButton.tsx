"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type DeleteButtonProps = React.ComponentProps<typeof Button> & {
  label?: string;
  loading?: boolean;
};

export function DeleteButton({
  label = "Supprimer",
  loading = false,
  ...props
}: DeleteButtonProps) {
  return (
    <Button
      variant="destructive"
      disabled={loading || props.disabled}
      {...props}
      className={"flex items-center gap-2 " + (props.className ?? "")}
    >
      <Trash2 className="h-4 w-4" />
      {loading ? "Suppression..." : label}
    </Button>
  );
}
