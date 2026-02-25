

// src/components/Sidebar/nav-top.tsx

import Image from "next/image";

export function NavTop() {
  return (
    <div className="flex items-center justify-center border-b border-gray-200 py-2">
        <Image
          src="/images/axcio_data.png"
          alt="Logo Axcio Data"
          width={36}
          height={36}
          className="h-auto w-auto transition-all duration-300"
        />
    </div>
  );
}
