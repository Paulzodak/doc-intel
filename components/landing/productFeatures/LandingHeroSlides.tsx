"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LANDING_HERO_SLIDE_INTERVAL_MS } from "./config";
import { heroSlideContainer } from "./motionVariants";
import { SlideFour } from "./SlideFour";
import { SlideOne } from "./SlideOne";
import { SlideThree } from "./SlideThree";
import { SlideTwo } from "./SlideTwo";

const HERO_SLIDES = [SlideOne, SlideTwo, SlideThree, SlideFour] as const;
const SLIDE_COUNT = HERO_SLIDES.length;

export function LandingHeroSlides() {
  const [active, setActive] = useState(0);
  const Slide = HERO_SLIDES[active];

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDE_COUNT);
    }, LANDING_HERO_SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center px-2 py-4 sm:px-4 sm:py-8 md:py-10">
      <div className="relative min-h-[26rem] w-full sm:min-h-160">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`hero-slide-${active}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${active + 1} of ${SLIDE_COUNT}`}
            className="absolutse inset-x-0 top-0 w-full"
            variants={heroSlideContainer}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Slide />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
