
// src/components/Header/HeaderProjet.tsx
 
import React from 'react';

const HeaderProjet = React.memo(() => {

	return (

		<div className="flex h-full bg-inherit items-center  p-4 border-0 w-2/6">
			<p className="dark:text-white text-sm text-center items-center font-bold">
					Easy Projet V2
			</p>
		</div>
	)		
})
HeaderProjet.displayName = "HeaderProjet"
export default HeaderProjet