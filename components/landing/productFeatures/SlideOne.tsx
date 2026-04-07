"use client";

import { motion } from "framer-motion";
import { LandingAiChatFeaturePanel } from "./LandingAiChatFeaturePanel";
import { LandingFeatureChatMock } from "./LandingFeatureChatMock";
import { slideOneBottom, slideOneTop } from "./motionVariants";

export function SlideOne() {
  return (
    <>
      <motion.div
        variants={slideOneTop}
        aria-label="Example: chat with your document to extract clause-level answers"
        className="relative z-10 m-auto flex hs-[17.5rem] max-w-[min(18rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl border border-white/50 bg-white/5 shadow-2xl backdrop-blur-3xl will-change-transform sm:h-80 sm:max-w-[min(20rem,calc(100vw-2.5rem))] sm:rounded-4xl"
      >
        <LandingFeatureChatMock />
      </motion.div>
      <motion.div
        variants={slideOneBottom}
        className="relative z-10 m-auto mt-6 flex w-full max-w-[min(30rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/4 backdrop-blur-3xl will-change-transform dark:bg-zinc-900 dark:ring-white/10 sm:mt-10 sm:w-120 sm:rounded-4xl"
      >
        <LandingAiChatFeaturePanel />
      </motion.div>
    </>
  );
}
