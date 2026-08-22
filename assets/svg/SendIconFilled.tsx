import clsx from "clsx";
import React from "react";

interface SendIconFilledProps {
  className?: string;
  size?: number;
  color?: string;
}

export const SendIconFilled = ({
  className,
  size = 24,
  color = "#05091C",
}: SendIconFilledProps) => {
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
        d="M15.6542 2.33449C18.8408 1.72335 21.6385 4.52097 21.0273 7.70757L19.2727 16.8566C18.8913 18.8455 17.3858 20.436 15.4297 20.9414C11.5241 21.9503 7.95463 18.3282 9.09831 14.4391C9.1299 14.3317 9.03011 14.2319 8.92271 14.2635C5.03362 15.4072 1.41158 11.8378 2.42049 7.93218C2.92582 5.97601 4.51636 4.47056 6.5052 4.08914L15.6542 2.33449Z"
        fill={color}
      />
    </svg>
  );
};

