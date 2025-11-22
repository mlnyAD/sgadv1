
// src/components/Header/headerSearch.tsx

import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const HeaderSearch = React.memo(() => {

	return (

		<div className="relative hidden w-4/6 md:flex border-0 border-white bg-inherit rounded-md">
			<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground " />
			<Input
				type="search"
				placeholder="Recherche..."
				className="w-[200px] lg:w-[300px] pl-8 bg-gray-200 text-slate-700 dark:text-white"
			/>
		</div>

	)		
})

HeaderSearch.displayName = "HeaderSearch"
export default HeaderSearch