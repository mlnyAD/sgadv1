"use client";

import { DbConfig } from "@/domain/config/config.interface";
import { TableTitle } from "@/components/IHM/TableTitle";
import { TableSubTitle } from "@/components/IHM/TableSubTitle";
import { CloseButton } from "@/components/Buttons/CloseButton";
import { useRouter } from "next/navigation";
import { ConfigDataTable } from "./ConfigDataTable";
import { columns } from "./columns";
import { NewButton } from "@/components/Buttons/NewButton";

export default function ConfigList({ initialData }: { initialData: DbConfig[] }) {

  const router = useRouter();

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
          <NewButton label="Nouvelle configuration" onClick={() => router.push("/configs/0")} />
          <CloseButton onClick={() => router.push("/dashboard")} />
        </div>

      </div>

      {/* TABLE */}
      <div className="mt-4 border bg-gray-100 dark:bg-black rounded-md">
        <ConfigDataTable data={initialData} columns={columns} />
      </div>
    </div>
  );
}
