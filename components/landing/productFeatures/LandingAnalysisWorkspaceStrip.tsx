"use client";

import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import type { AnalysisFocus } from "./config";
import {
  landingAnalysisFindings,
  landingAnalysisFocusCopy,
  landingAnalysisPanelCopy,
  landingAnalysisScores,
} from "./config";
import { easeOut } from "./motionVariants";

export function LandingAnalysisWorkspaceStrip({
  active,
  onChange,
}: {
  active: AnalysisFocus;
  onChange: (id: AnalysisFocus) => void;
}) {
  const copy = landingAnalysisFocusCopy[active];
  return (
    <div className="flex h-full min-h-0 items-stretch gap-2.5 px-2.5 py-2 sm:gap-5 sm:px-5 sm:py-4">
      <div className="flex w-16 shrink-0 flex-col items-center justify-center border-r border-gray-100 pr-2 dark:border-white/10 sm:w-[5.25rem] sm:pr-4">
        <div
          className="flex size-14 flex-col items-center justify-center rounded-xl bg-linear-to-b from-[#124F35] to-[#1D734B] text-white shadow-md sm:size-[4.5rem] sm:rounded-2xl"
          aria-hidden
        >
          <span className="text-[8px] font-semibold uppercase tracking-wide text-white/80 sm:text-[9px]">
            Overall
          </span>
          <span className="text-xl font-bold leading-none sm:text-[1.65rem]">
            {landingAnalysisScores.overall}
          </span>
        </div>
        <p className="mt-1 text-center text-[8px] font-medium text-gray-400 dark:text-gray-500 sm:mt-1.5 sm:text-[9px]">
          / 100
        </p>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="mt-0.5 text-center font-lora text-sm font-medium leading-tight tracking-tight text-[#121714] dark:text-white sm:mt-1 sm:text-lg md:text-xl">
          {landingAnalysisPanelCopy.workspaceTitle}
        </h3>
        <div className="mt-2 flex shrink-0 flex-wrap items-center justify-center gap-0.5 sm:mt-4 sm:gap-1">
          {landingAnalysisFindings.map((row) => {
            const isOn = active === row.id;
            return (
              <button
                key={row.id}
                type="button"
                onClick={() => onChange(row.id)}
                className={clsx(
                  "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary-green/45 focus-visible:ring-offset-2 sm:px-2.5 sm:py-1 sm:text-[10px]",
                  isOn
                    ? "bg-[#121714] text-white dark:bg-white dark:text-[#121714]"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200/90 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/15",
                )}
              >
                {row.label}
              </button>
            );
          })}
        </div>
        <div className="mt-1.5 flex shrink-0 flex-wrap gap-1 border-b border-gray-100 pb-1.5 dark:border-white/10 sm:mt-2 sm:gap-2 sm:pb-2">
          <span className="inline-flex items-center gap-0.5 rounded-md bg-amber-50 px-1.5 py-0.5 text-[9px] font-semibold text-amber-800 dark:bg-amber-950/40 dark:text-amber-200 sm:gap-1 sm:px-2 sm:text-[10px]">
            Risk {landingAnalysisScores.risk}%
          </span>
          <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-800 dark:bg-emerald-950/35 dark:text-emerald-200 sm:gap-1 sm:px-2 sm:text-[10px]">
            Adv {landingAnalysisScores.advantages}%
          </span>
          <span className="inline-flex items-center gap-0.5 rounded-md bg-sky-50 px-1.5 py-0.5 text-[9px] font-semibold text-sky-900 dark:bg-sky-950/40 dark:text-sky-200 sm:gap-1 sm:px-2 sm:text-[10px]">
            Compl {landingAnalysisScores.compliance}%
          </span>
        </div>
        <div className="min-h-0 flex-1 pt-1 sm:pt-2">
          <p className="text-[9px] font-semibold uppercase tracking-wide text-primary-green sm:text-[10px]">
            {copy.panelHint}
          </p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.2, ease: easeOut }}
              className="mt-1"
            >
              <p className="text-[11.5px] font-bold leading-snug text-[#121714] dark:text-white sm:text-[13px]">
                {copy.headline}
              </p>
              <p className="mt-0.5 text-[10px] leading-relaxed text-gray-600 dark:text-gray-400 sm:mt-1 sm:text-[11.5px]">
                {copy.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
