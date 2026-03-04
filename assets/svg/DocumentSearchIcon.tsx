import clsx from "clsx";
import React from "react";

interface DocumentSearchIconProps {
  className?: string;
  size?: number;
  /** Document fill (dark) */
  color?: string;
}

const DOC_DARK = "#11161f";
const MAGNIFIER_GREEN = "#124F35";
const LENS_GREEN = "#47e18c";
const OUTLINE = "rgba(255,255,255,0.25)";

export const DocumentSearchIcon = ({
  className,
  size = 24,
  color = DOC_DARK,
}: DocumentSearchIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      className={clsx(className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Back document */}
      <rect
        x="2"
        y="5"
        width="13"
        height="16"
        rx="1.5"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="0.4"
      />
      {/* Front document */}
      <rect
        x="5"
        y="2"
        width="13"
        height="16"
        rx="1.5"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="0.4"
      />
      {/* Text lines on front document */}
      <line
        x1="8"
        y1="5.8"
        x2="15"
        y2="5.8"
        stroke="white"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
      <line
        x1="6.5"
        y1="9.5"
        x2="16.5"
        y2="9.5"
        stroke="white"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
      <line
        x1="9.5"
        y1="15"
        x2="14.5"
        y2="15"
        stroke="white"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
      {/* Magnifying glass – lens circle (lighter fill, frame as stroke) */}
      <circle cx="14" cy="9" r="5" fill={LENS_GREEN} stroke={MAGNIFIER_GREEN} strokeWidth="1.2" />
      <circle cx="14" cy="9" r="5" fill="none" stroke={OUTLINE} strokeWidth="0.35" />
      {/* Lens highlight (curved) + dot */}
      <path
        d="M11.2 6.8a1.8 1.8 0 0 1 2.2-.6"
        stroke="white"
        strokeWidth="0.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="11.8" cy="7.2" r="0.35" fill="white" />
      {/* Handle (outline behind, then main stroke) */}
      <path
        d="M17.8 13.2c.6.6 2.2 2.4 3.2 4.8.5 1.2.4 2.2-.2 2.8-.5.5-1.4.5-2.6-.2-2.2-1.3-3.8-2.8-4.4-3.4"
        stroke={OUTLINE}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M17.8 13.2c.6.6 2.2 2.4 3.2 4.8.5 1.2.4 2.2-.2 2.8-.5.5-1.4.5-2.6-.2-2.2-1.3-3.8-2.8-4.4-3.4"
        stroke={MAGNIFIER_GREEN}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};
