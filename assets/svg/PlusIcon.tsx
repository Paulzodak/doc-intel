import clsx from "clsx";
import React from "react";

interface PlusIconProps {
  className?: string;
  size?: number;
  color?: string;
}
export const PlusIcon = ({ className, size = 24, color = "#05091C" }: PlusIconProps) => {
  return (
    <svg
      width={size ?? "24"}
      height={size ?? "24"}
      className={clsx(className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12H20M12 20V12L12 4"
        stroke={color ?? "#05091C"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
