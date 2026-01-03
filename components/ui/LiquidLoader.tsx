"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LiquidLoaderProps {
  percentage: number;
  className?: string;
  color?: string;
}

export const LiquidLoader: React.FC<LiquidLoaderProps> = ({
  percentage,
  className,
  color = "bg-white",
}) => {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className={cn("absolute inset-0 overflow-hidden rounded-[inherit]", className)}>
      {/* Liquid fill with wave animation - horizontal */}
      <div
        className={cn(
          "absolute top-0 bottom-0 left-0 transition-all duration-300 ease-out",
          color,
          "opacity-30"
        )}
        style={{
          width: `${clampedPercentage}%`,
        }}
      >
        {/* Wave effect - vertical wave for horizontal fill */}
        <div
          className="absolute -left-4 top-0 bottom-0 w-8 liquid-wave"
          style={{
            background: `linear-gradient(0deg, transparent, rgba(255,255,255,0.4), transparent)`,
          }}
        />
      </div>

      {/* Percentage text overlay */}
      {/* {clampedPercentage > 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <span className="text-xs font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {Math.round(clampedPercentage)}%
          </span>
        </div>
      )} */}
    </div>
  );
};
