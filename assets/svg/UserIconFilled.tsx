import clsx from "clsx";
import React from "react";

interface UserIconFilledProps {
  className?: string;
  size?: number;
  color?: string;
}

export const UserIconFilled = ({
  className,
  size = 24,
  color = "#05091C",
}: UserIconFilledProps) => {
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
        d="M12 2C9.37665 2 7.25 4.12665 7.25 6.75C7.25 9.37335 9.37665 11.5 12 11.5C14.6234 11.5 16.75 9.37335 16.75 6.75C16.75 4.12665 14.6234 2 12 2Z"
        fill={color}
      />
      <path
        d="M9 13C6.37665 13 4.25 15.1266 4.25 17.75C4.25 20.3734 6.37665 22.5 9 22.5H15C17.6234 22.5 19.75 20.3734 19.75 17.75C19.75 15.1266 17.6234 13 15 13H9Z"
        fill={color}
      />
    </svg>
  );
};

