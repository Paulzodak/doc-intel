"use client";

import clsx from "clsx";
import React, { useState } from "react";

interface Dot {
  id: number;
  top: string;
  left?: string;
  right?: string;
  size: string;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
}

const colors = [
  "bg-primary",
  "bg-neutral-400",
  "bg-neutral-300",
  "bg-neutral-500",
  "bg-gray-300",
  "bg-gray-400",
  "bg-gray-500",
  "bg-blue-300",
  "bg-blue-400",
  "bg-blue-500",
];

const sizes = ["w-1 h-1", "w-1.5 h-1.5", "w-2 h-2", "w-2.5 h-2.5", "w-3 h-3"];
const opacities = [25, 30, 35, 40, 45, 50, 55, 60];

const DecorativeDots: React.FC<{ count?: number; dropAnimate?: boolean; className?: string }> = ({
  count = 100,
  dropAnimate = false,
  className,
}) => {
  // Generate random dots using useState lazy initializer to avoid calling Math.random during render
  const [dots] = useState<Dot[]>(() => {
    const dotsArray: Dot[] = [];
    for (let i = 0; i < count; i++) {
      const useLeft = Math.random() > 0.5;
      const position = Math.random() * 100;

      // If dropAnimate is true, start dots from above viewport; otherwise use original pattern
      const top = dropAnimate
        ? Math.random() * -20 - 10 // Range from -30% to -10% (above viewport)
        : Math.random() * 120; // Range from 0% to 120% (original pattern)

      // Random animation duration between 3-8 seconds for variety (only if dropAnimate is true)
      const duration = dropAnimate ? 10 + Math.random() * 5 : 0;
      // Random delay between 0-5 seconds so dots don't all start at once (only if dropAnimate is true)
      const delay = dropAnimate ? Math.random() * 5 : 0;

      const dot: Dot = {
        id: i,
        top: `${top}%`,
        size: sizes[Math.floor(Math.random() * sizes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: opacities[Math.floor(Math.random() * opacities.length)],
        duration: duration,
        delay: delay,
      };

      if (useLeft) {
        dot.left = `${position}%`;
      } else {
        dot.right = `${position}%`;
      }

      dotsArray.push(dot);
    }
    return dotsArray;
  });

  return (
    <div className={clsx("absolute inset-0 pointer-events-none overflow-hidden z-20", className)}>
      {dots.map((dot) => (
        <div
          key={dot.id}
          className={`absolute ${dot.size} ${dot.color} rounded-full`}
          style={{
            top: dot.top,
            left: dot.left,
            right: dot.right,
            opacity: dot.opacity / 100,
            ...(dropAnimate && {
              animation: `falling ${dot.duration}s linear infinite`,
              animationDelay: `${dot.delay}s`,
            }),
          }}
        />
      ))}
    </div>
  );
};

export default DecorativeDots;
