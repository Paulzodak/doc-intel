import clsx from "clsx";
import React from "react";

interface DotGridBackgroundProps {
  className?: string;
  /** CSS color value for the dots (default: rgba(255, 255, 255, 0.1)) */
  dotColor?: string;
  /** Dot size in px (default: 1) */
  dotSize?: number;
  /** Grid cell size in px (default: 30) */
  gridSize?: number;
}

export const DotGridBackground = ({
  className,
  dotColor = "rgba(255, 255, 255, 0.1)",
  dotSize = 1,
  gridSize = 30,
}: DotGridBackgroundProps) => {
  return (
    <div
      aria-hidden
      style={{
        backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${gridSize}px ${gridSize}px`,
      }}
      className={clsx(className)}
    />
  );
};
