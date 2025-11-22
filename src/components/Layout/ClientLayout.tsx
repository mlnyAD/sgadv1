
// src/components/Layout/ClientLayout.tsx
"use client";

import React from "react";
import { ThemeProvider } from "@/theme/theme-provider";
/*
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { UserContextProvider } from "@/contexts/UserContext";
import Header from "@/components/Header/Header";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { MasterDataProvider } from "@/contexts/MasterDataProvider";

*/


export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
