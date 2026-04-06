

import Image from "next/image";

type NavTopProps = {
  logoUrl?: string | null;
  alt?: string;
};

export function NavTop({
  logoUrl,
  alt = "Logo Axcio Data",
}: NavTopProps) {
  return (
    <div className="flex items-center justify-center border-b border-gray-200 py-2">
      <Image
        src={logoUrl ?? "/images/axcio_data.png"}
        alt={alt}
        width={55}
        height={55}
        className="h-auto w-auto transition-all duration-300"
      />
    </div>
  );
}