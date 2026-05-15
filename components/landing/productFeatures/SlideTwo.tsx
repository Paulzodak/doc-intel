"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { AnalysisFocus } from "./config";
import { LandingAnalysisFindingsColumn } from "./LandingAnalysisFindingsColumn";
import { LandingAnalysisWorkspaceStrip } from "./LandingAnalysisWorkspaceStrip";
import { slideTwoBottom, slideTwoTop } from "./motionVariants";

export function SlideTwo() {
  const [analysisFocus, setAnalysisFocus] = useState<AnalysisFocus>("summary");

  return (
    <>
      <motion.div
        variants={slideTwoTop}
        aria-label="Sample document analysis findings"
        className="relative z-10 m-auto flex hs-[min(24rem,62vh)] w-full max-w-[min(14rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-white/95 shadow-2xl max-md:backdrop-blur-none md:border-white/20 md:bg-white/5 md:backdrop-blur-3xl md:will-change-transform sm:h-120 sm:max-w-[min(15rem,calc(100vw-2.5rem))] sm:rounded-4xl"
      >
        <LandingAnalysisFindingsColumn active={analysisFocus} onChange={setAnalysisFocus} />
      </motion.div>
      <motion.div
        variants={slideTwoBottom}
        className="relative z-10 m-auto mt-6 flex h-[13.5rem] w-full max-w-[min(30rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/4 max-md:backdrop-blur-none md:backdrop-blur-3xl md:will-change-transform dark:bg-zinc-900 dark:ring-white/10 sm:mt-10 sm:h-60 sm:w-120 sm:rounded-4xl"
      >
        <LandingAnalysisWorkspaceStrip active={analysisFocus} onChange={setAnalysisFocus} />
      </motion.div>
    </>
  );
}
