// src/components/Sidebar/nav-top.tsx

import Image from "next/image";

export function NavTop() {
  return (
    <div className="flex items-center justify-center border-b border-gray-200 p-2">
      <Image
        src="/images/axcio.png"
        width={100}
        height={100}
        alt="logo client"
        priority
      />
    </div>
  );
}