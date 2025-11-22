
// src/components/Header/Header.tsx

"use client";

import React from "react";
import HeaderProjet from "@/components/Header/HeaderProjet";
import HeaderInfo from "@/components/Header/HeaderInfo";
import HeaderSearch from "@/components/Header/HeaderSearch";
import HeaderChat from "@/components/Header/HeaderChat";
import HeaderTheme from "@/components/Header/HeaderTheme";

const Header = React.memo(() => {
  return (
    <header className="flex bg-inherit dark:bg-black items-center px-2 h-full md:px-6 justify-between w-[calc(100%-42px)] rounded-md">
      <HeaderProjet />
      <HeaderInfo />
      <HeaderSearch />
      <HeaderChat />
      <HeaderTheme />
    </header>
  );
});

Header.displayName = "Header";
export default Header;
