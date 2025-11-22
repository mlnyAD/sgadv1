
// srv/components/Header/headerChat.tsx

import React from 'react';

//import ChatRoomForm from "@/components/Chatroom/ChatRoomForm";

const HeaderChat = React.memo(() => {

	return (

		<div className="flex flex-row w-1/6 bg-inherit dark:bg-black space-x-2 items-center rounded-full border-0 p-1 relative  ">
		{/*	<ChatRoomForm />  */}
			Chatroom
		</div>

	)		
})

HeaderChat.displayName = "HeaderChat"
export default HeaderChat

