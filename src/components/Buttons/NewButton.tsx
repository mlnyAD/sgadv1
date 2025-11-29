"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type NewButtonProps = React.ComponentProps<typeof Button> & {
  label: string;
};

export function NewButton({ label, ...props }: NewButtonProps) {
  return (
    <Button
      variant="axcio"
      {...props}
      className={"flex items-center gap-2 " + (props.className ?? "")}
    >
      <Plus className="h-4 w-4" />
      {label}
    </Button>
  );
}
