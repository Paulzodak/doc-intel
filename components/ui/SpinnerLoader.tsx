import React from "react";
import { cn } from "@/lib/utils";

interface SpinnerLoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  color?: string;
}

export const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({
  size = "md",
  className,
  color = "text-white",
}) => {
  const sizeClasses = {
    sm: "w-3 h-3 border-2",
    md: "w-4 h-4 border-2",
    lg: "w-6 h-6 border-[3px]",
  };

  return (
    <div
      className={cn(
        "text-green-700 inline-block rounded-full border-solid border-t-transparent border-r-transparent border-b-transparent animate-spin",
        sizeClasses[size],
        color,
        className,
      )}
      style={{
        borderTopColor: "oklch(52.7% 0.154 150.069)",
      }}
      aria-label="Loading"
      role="status"
    />
  );
};
