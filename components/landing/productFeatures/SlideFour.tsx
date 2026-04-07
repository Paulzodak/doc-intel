"use client";

import { motion } from "framer-motion";
import { LandingExportFeaturePanel } from "./LandingExportFeaturePanel";
import { LandingExportMock } from "./LandingExportMock";
import { slideFourBottom, slideFourTop } from "./motionVariants";

export function SlideFour() {
  return (
    <>
      <motion.div
        variants={slideFourTop}
        aria-label="Example: export document with highlights as PDF or PNG"
        className="relative z-10 m-auto flex  w-full max-w-[min(18rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl border border-white/50 bg-white/5 shadow-2xl backdrop-blur-3xl will-change-transform  sm:max-w-[min(20rem,calc(100vw-2.5rem))] sm:rounded-4xl"
      >
        <LandingExportMock />
      </motion.div>
      <motion.div
        variants={slideFourBottom}
        className="relative z-10 m-auto mt-6 flex w-full max-w-[min(30rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/4 backdrop-blur-3xl will-change-transform dark:bg-zinc-900 dark:ring-white/10 sm:mt-10 sm:w-120 sm:rounded-4xl"
      >
        <LandingExportFeaturePanel />
      </motion.div>
    </>
  );
}
