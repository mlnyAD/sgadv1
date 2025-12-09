"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import DeleteConfigDialog from "./DeleteConfigDialog";
import type { ConfigListItem } from "@/domain/config/config.list.repository";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface RowActionsProps {
  row: ConfigListItem;
  onDeleted: () => void;
}

export default function RowActions({ row, onDeleted }: RowActionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex items-center gap-3">

        {/* ✏️ MODIFIER */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/configs/${row.configId}`}>
              <Pencil
                className="h-4 w-4 text-blue-600 hover:text-blue-800 cursor-pointer"
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="bg-ad-dark text-white">
            Modifier la configuration
          </TooltipContent>
        </Tooltip>

        {/* 🗑️ SUPPRIMER */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="m-0 p-0"
            >
              <Trash2
                className="h-4 w-4 text-red-600 hover:text-red-800 cursor-pointer"
              />
            </button>
          </TooltipTrigger>
          <TooltipContent className="bg-ad-dark text-white">
            Supprimer la configuration
          </TooltipContent>
        </Tooltip>

        {/* 💬 Dialog de confirmation */}
        <DeleteConfigDialog
          open={open}
          onOpenChange={setOpen}
          configId={row.configId}
          configName={row.label}
          onDeleted={onDeleted}
        />
      </div>
    </TooltipProvider>
  );
}
