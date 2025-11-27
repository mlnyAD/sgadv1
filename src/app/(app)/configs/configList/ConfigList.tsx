"use client";

import { ConfigType } from "@/utils/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TableTitle } from "@/components/IHM/TableTitle";
import { TableSubTitle } from "@/components/IHM/TableSubTitle";
import { CloseWindow } from "@/components/IHM/CloseWindow";

import { ConfigDataTable } from "./ConfigDataTable";
import { columns } from "./columns";

export default function ConfigList({ initialData }: { initialData: ConfigType[] }) {
  return (
    <div className="flex flex-col w-full bg-inherit rounded-md">
      <div className="flex justify-between items-center">
        
        {/* TITRES */}
        <div>
          <TableTitle>Configurations</TableTitle>
          <TableSubTitle>Liste des configurations</TableSubTitle>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          <Button variant="axcio" asChild>
            <Link href="/configs/0">Nouvelle configuration</Link>
          </Button>

          <CloseWindow />
        </div>

      </div>

      {/* TABLE */}
      <div className="mt-4 border bg-gray-100 dark:bg-black rounded-md">
        <ConfigDataTable data={initialData} columns={columns} />
      </div>
    </div>
  );
}
