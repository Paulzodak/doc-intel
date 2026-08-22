"use client";

import { motion } from "framer-motion";
import { LandingShareFeaturePanel } from "./LandingShareFeaturePanel";
import { LandingShareMock } from "./LandingShareMock";
import { slideThreeBottom, slideThreeTop } from "./motionVariants";

export function SlideThree() {
  return (
    <>
      <motion.div
        variants={slideThreeTop}
        aria-label="Example: share document with link, QR code, and people with access"
        className="relative z-10 m-auto flex min-h-[19rem] w-full max-w-[min(20rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-white/95 shadow-2xl max-md:backdrop-blur-none md:border-white/35 md:bg-white/25 md:backdrop-blur-2xl md:will-change-transform sm:min-h-[24rem] sm:max-w-sm sm:rounded-4xl"
      >
        <LandingShareMock />
      </motion.div>
      <motion.div
        variants={slideThreeBottom}
        className="relative z-10 m-auto mt-6 flex w-full max-w-[min(30rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/4 max-md:backdrop-blur-none md:backdrop-blur-3xl md:will-change-transform dark:bg-zinc-900 dark:ring-white/10 sm:mt-10 sm:w-120 sm:rounded-4xl"
      >
        <LandingShareFeaturePanel />
      </motion.div>
    </>
  );
}
