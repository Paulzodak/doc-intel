import clsx from "clsx";
import React from "react";

interface MenuIcon2Props {
  className?: string;
  size?: number;
  color?: string;
  onClick?: () => void;
}

export const MenuIcon2 = ({
  className,
  size = 24,
  color = "#2D264B",
  onClick,
}: MenuIcon2Props) => {
  return (
    <svg
      width={size}
      height={size}
      className={clsx(className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M5 5.25C4.58579 5.25 4.25 5.58579 4.25 6C4.25 6.41421 4.58579 6.75 5 6.75H19C19.4142 6.75 19.75 6.41421 19.75 6C19.75 5.58579 19.4142 5.25 19 5.25H5Z"
        fill={color}
      />
      <path
        d="M5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75H19C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25H5Z"
        fill={color}
      />
      <path
        d="M5 17.25C4.58579 17.25 4.25 17.5858 4.25 18C4.25 18.4142 4.58579 18.75 5 18.75H19C19.4142 18.75 19.75 18.4142 19.75 18C19.75 17.5858 19.4142 17.25 19 17.25H5Z"
        fill={color}
      />
    </svg>
  );
};
