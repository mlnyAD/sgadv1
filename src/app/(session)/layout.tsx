

import type { ReactNode } from "react";
import Providers from "@/app/providers";

export default function SessionLayout({ children }: { children: ReactNode }) {
  return <Providers>{children}</Providers>;
}