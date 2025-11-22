
// src/components/Header/headerTheme.tsx


import React from 'react';
import { ThemeToggle } from "@/theme/ThemeToggle";

const HeaderTheme = React.memo(() => {

	return (

		<div className="relative w-1/6 hidden md:flex border-0 justify-end space-x-4 bg-inherit space-between border-white rounded-md">
			<ThemeToggle />
		</div>

	)		
})
HeaderTheme.displayName = "HeaderTheme"
export default HeaderTheme






