import clsx from "clsx";
import React from "react";

interface LockIconFilledProps {
  className?: string;
  size?: number;
  color?: string;
}

export const LockIconFilled = ({
  className,
  size = 24,
  color = "#05091C",
}: LockIconFilledProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={clsx(className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.25a5.75 5.75 0 0 0-5.75 5.75v3h-.5A2.75 2.75 0 0 0 3 12.75v8.5A2.75 2.75 0 0 0 5.75 24h12.5A2.75 2.75 0 0 0 21 21.25v-8.5a2.75 2.75 0 0 0-2.75-2.75h-.5V7A5.75 5.75 0 0 0 12 1.25ZM8.5 7A3.5 3.5 0 0 1 12 3.5a3.5 3.5 0 0 1 3.5 3.5v3h-7V7Z"
        fill={color}
      />
    </svg>
  );
};
