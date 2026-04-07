"use client";

import clsx from "clsx";
import type { AnalysisFocus } from "./config";
import { landingAnalysisFindings, landingAnalysisPanelCopy } from "./config";
import { MacWindowDots } from "./MacWindowDots";

export function LandingAnalysisFindingsColumn({
  active,
  onChange,
}: {
  active: AnalysisFocus;
  onChange: (id: AnalysisFocus) => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[inherit] p-2.5 sm:p-4">
      <MacWindowDots className="flex shrink-0 items-center gap-1 sm:gap-1.5" />
      <div className="mb-2 mt-1.5 shrink-0 sm:mb-3 sm:mt-2">
        <p className="text-xs font-bold text-gray-800 sm:text-sm">{landingAnalysisPanelCopy.findingsHeading}</p>
        <p className="text-[10px] leading-snug text-gray-500 sm:text-[11px]">
          {landingAnalysisPanelCopy.findingsSubheading}
        </p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto sm:gap-2" aria-label="Sample findings">
        {landingAnalysisFindings.map((row) => {
          const isOn = active === row.id;
          const Icon = row.Icon;
          return (
            <button
              key={row.id}
              type="button"
              onClick={() => onChange(row.id)}
              className={clsx(
                "flex w-full gap-2 rounded-lg border border-white/30 bg-white/35 px-2 py-1.5 text-left shadow-sm backdrop-blur-sm transition-[box-shadow,background-color,border-color] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary-green/45 focus-visible:ring-offset-2 sm:gap-2.5 sm:rounded-xl sm:px-2.5 sm:py-2",
                isOn && "border-primary-green/40 bg-white/55 shadow-md ring-1 ring-primary-green/20",
              )}
            >
              <span
                className={clsx("w-1 shrink-0 self-stretch rounded-full", row.barClass)}
                aria-hidden
              />
              <span
                className={clsx(
                  "flex size-7 shrink-0 items-center justify-center rounded-md bg-white/80 sm:size-8 sm:rounded-lg",
                  row.iconClass,
                )}
              >
                <Icon size={15} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-bold text-gray-800 sm:text-[11px]">{row.label}</span>
                <span className="mt-0.5 block text-[9.5px] leading-snug text-gray-600 sm:text-[10.5px]">
                  {row.snippet}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
