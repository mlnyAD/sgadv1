"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: number;   // diamètre du spinner
  height?: number; // hauteur du conteneur
  className?: string;
}

export default function Spinner({
  size = 20,
  height = 64,
  className,
}: SpinnerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full",
        className
      )}
      style={{ height }}
    >
      <div
        className="animate-spin rounded-full border-2 border-blue-500 dark:border-white border-t-transparent"
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
}
