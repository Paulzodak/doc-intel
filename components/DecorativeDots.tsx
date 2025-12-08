"use client";

import React, { useState } from "react";

interface Dot {
  id: number;
  top: string;
  left?: string;
  right?: string;
  size: string;
  color: string;
  opacity: number;
}

const colors = [
  "bg-primary",
  "bg-purple-400",
  "bg-purple-300",
  "bg-purple-500",
  "bg-orange-300",
  "bg-orange-400",
  "bg-orange-500",
  "bg-blue-300",
  "bg-blue-400",
  "bg-blue-500",
];

const sizes = ["w-1 h-1", "w-1.5 h-1.5", "w-2 h-2", "w-2.5 h-2.5", "w-3 h-3"];
const opacities = [25, 30, 35, 40, 45, 50, 55, 60];

const DecorativeDots: React.FC<{ count?: number }> = ({ count = 100 }) => {
  // Generate random dots using useState lazy initializer to avoid calling Math.random during render
  const [dots] = useState<Dot[]>(() => {
    const dotsArray: Dot[] = [];
    for (let i = 0; i < count; i++) {
      const useLeft = Math.random() > 0.5;
      const position = Math.random() * 100;
      const top = Math.random() * 120; // Allow dots to go slightly beyond 100vh

      const dot: Dot = {
        id: i,
        top: `${top}%`,
        size: sizes[Math.floor(Math.random() * sizes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: opacities[Math.floor(Math.random() * opacities.length)],
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
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 z-20">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className={`absolute ${dot.size} ${dot.color} rounded-full`}
          style={{
            top: dot.top,
            left: dot.left,
            right: dot.right,
            opacity: dot.opacity / 100,
          }}
        />
      ))}
    </div>
  );
};

export default DecorativeDots;
