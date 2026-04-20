"use client";

import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { useState } from "react";
import { landingAiChatFeatures, landingAiChatPanelCopy } from "./config";
import { easeOut } from "./motionVariants";

export function LandingAiChatFeaturePanel() {
  const [active, setActive] = useState(0);
  const current = landingAiChatFeatures[active];

  return (
    <div className="flex h-full min-h-0 flex-col px-3.5 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6">
      <header className="shrink-0">
        <h3 className="mt-0.5 text-center font-lora text-base font-medium leading-tight tracking-tight text-[#121714] dark:text-white sm:mt-1 sm:text-lg md:text-xl">
          {landingAiChatPanelCopy.title}
        </h3>
        <p className="mt-1 text-center text-[10.5px] leading-snug text-gray-500 dark:text-gray-400 sm:mt-1.5 sm:text-[12px]">
          {landingAiChatPanelCopy.subtitle}
        </p>
      </header>
      <div
        className="mt-3 flex min-h-0 flex-1 flex-col gap-1 sm:mt-4 sm:gap-1.5"
        role="tablist"
        aria-label="AI chat capabilities"
      >
        {landingAiChatFeatures.map((f, i) => {
          const isActive = active === i;
          const Icon = f.Icon;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`ai-chat-feature-${f.id}`}
              id={`ai-chat-tab-${f.id}`}
              onClick={() => setActive(i)}
              className={clsx(
                "flex w-full items-center gap-2 rounded-xl border px-2.5 py-1.5 text-left transition-[background-color,border-color,box-shadow] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary-green/50 focus-visible:ring-offset-2 sm:gap-3 sm:rounded-2xl sm:px-3 sm:py-2",
                isActive
                  ? "border-primary-green/35 bg-primary-green/9 shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:bg-primary-green/15"
                  : "border-transparent bg-gray-50/90 hover:border-gray-200/90 dark:bg-white/5 dark:hover:border-white/15",
              )}
            >
              <span
                className={clsx(
                  "flex size-7 shrink-0 items-center justify-center rounded-lg transition-colors sm:size-8 sm:rounded-xl",
                  isActive
                    ? "bg-primary-green/20 text-[#121714] dark:text-white"
                    : "bg-gray-200/80 text-gray-500 dark:bg-white/10 dark:text-gray-400",
                )}
              >
                <Icon className="size-3.5 sm:size-4" strokeWidth={2} aria-hidden />
              </span>
              <span
                className={clsx(
                  "text-[12px] font-semibold leading-tight sm:text-[13px]",
                  isActive ? "text-[#121714] dark:text-white" : "text-gray-600 dark:text-gray-300",
                )}
              >
                {f.title}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-2 shrink-0 border-t border-gray-100 pt-2 dark:border-white/10 sm:mt-3 sm:pt-3">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={current.id}
            id={`ai-chat-feature-${current.id}`}
            role="tabpanel"
            aria-labelledby={`ai-chat-tab-${current.id}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: easeOut }}
            className="text-[11px] leading-relaxed text-gray-600 dark:text-gray-400 sm:text-[12.5px]"
          >
            {current.detail}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
