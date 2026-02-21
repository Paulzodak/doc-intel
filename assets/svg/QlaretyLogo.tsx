import clsx from "clsx";
import React, { useId } from "react";

interface QlaretyLogoProps {
  className?: string;
  size?: number;
}

/**
 * Qlarety logo mark: a rounded shield shape (legal trust) containing a
 * stylised document-page with an AI clarity spark. Filled, modern, mature.
 * Palette: primary navy (#1e2939), white cutouts, primary-green (#47e18c) accent.
 */
export const QlaretyLogo = ({ className, size = 24 }: QlaretyLogoProps) => {
  const uid = useId().replace(/:/g, "");
  const greenGrad = `ql-g-${uid}`;
  const shadow = `ql-s-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      className={clsx(className)}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient
          id={greenGrad}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#5eeaa0" />
          <stop offset="100%" stopColor="#3bc97a" />
        </linearGradient>
        <filter id={shadow} x="-10%" y="-5%" width="120%" height="125%">
          <feDropShadow
            dx="0"
            dy="1.5"
            stdDeviation="1"
            floodColor="#0a0f16"
            floodOpacity="0.18"
          />
        </filter>
      </defs>

      {/* ── Rounded shield body (navy) ── */}
      <g filter={`url(#${shadow})`}>
        <path
          d="M24 2 C24 2 37 6 42 8 C42 8 44 9 44 12 L44 28 C44 36 36 43 24 46 C12 43 4 36 4 28 L4 12 C4 9 6 8 6 8 C11 6 24 2 24 2 Z"
          fill="#1e2939"
        />
      </g>

      {/* ── Document page (white, top-left corner folded) ── */}
      <path
        d="M16 12 L28 12 L32 16 L32 36 L16 36 Z"
        fill="white"
        fillOpacity="0.95"
      />
      {/* Corner fold */}
      <path
        d="M28 12 L28 16 L32 16 Z"
        fill="#1e2939"
        fillOpacity="0.12"
      />

      {/* ── Text lines on document ── */}
      <rect x="19" y="19" width="10" height="1.6" rx="0.8" fill="#1e2939" fillOpacity="0.2" />
      <rect x="19" y="23" width="8"  height="1.6" rx="0.8" fill="#1e2939" fillOpacity="0.15" />
      <rect x="19" y="27" width="10" height="1.6" rx="0.8" fill="#1e2939" fillOpacity="0.12" />

      {/* ── AI clarity spark / checkmark (green accent) ── */}
      <path
        d="M21 31 L23.5 33.5 L28 28"
        stroke={`url(#${greenGrad})`}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* ── Small green dot (AI pulse) ── */}
      <circle cx="35" cy="11" r="2.2" fill={`url(#${greenGrad})`} />
    </svg>
  );
};
