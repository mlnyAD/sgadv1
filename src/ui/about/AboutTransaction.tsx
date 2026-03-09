

"use client";

import { TableHeader } from "@/components/transaction/TableHeader";
import { AboutCard } from "./AboutCard";
import { APP_INFO } from "@/config/app-info";


export function AboutTransaction() {

	return (
		<div className="mx-auto w-full space-y-4">
			<TableHeader
				title={`${APP_INFO.projectName} - Version ${APP_INFO.version} du ${APP_INFO.versionDate}`}
				subtitle={APP_INFO.projectDescription}
			/>

			<AboutCard />
		</div>
	);
}
