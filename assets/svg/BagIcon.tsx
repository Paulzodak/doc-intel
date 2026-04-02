import clsx from "clsx";
import React from "react";

interface BagIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const BagIcon = ({ className, size = 24, color = "#05091C" }: BagIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      className={clsx(className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.0003 6C17.0003 3.23858 14.7617 1 12.0003 1C9.23884 1 7.00027 3.23858 7.00027 6M17.0003 6H18.309C20.3947 6 21.4375 6 22.0338 6.66616C22.63 7.33231 22.5148 8.36879 22.2845 10.4417L21.9887 13.1043C21.5185 17.3356 21.2835 19.4513 19.8597 20.7256C18.4359 22 16.2907 22 12.0003 22C7.70987 22 5.56467 22 4.14087 20.7256C2.71707 19.4513 2.482 17.3356 2.01186 13.1043L1.71601 10.4417C1.48569 8.36879 1.37052 7.33231 1.96676 6.66616C2.563 6 3.60585 6 5.69155 6H7.00027M17.0003 6H7.00027M18.0003 10H6.00027"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
