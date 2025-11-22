
// src/components/Header/headerInfo.tsx

import React from 'react';

const HeaderInfo = React.memo(() => {

	return (

		<div className="flex w-1/2 justify-start items-center bg-inherit space-x-6 border-0">
			<p>Information</p>
		</div>

	)		
})

HeaderInfo.displayName = "HeaderInfo"
export default HeaderInfo