

import type { ReactNode } from "react";
import Providers from "@/app/providers";

export default function SessionLayout({ children }: { children: ReactNode }) {

  console.log("Passage dans SessionLaoyout");

  return <Providers>{children}</Providers>;
}