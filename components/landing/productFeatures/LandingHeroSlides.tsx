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

const MOBILE_MQ = "(max-width: 767px)";
const REDUCED_MOTION_MQ = "(prefers-reduced-motion: reduce)";

function useHeroCarouselEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia(MOBILE_MQ);
    const reduced = window.matchMedia(REDUCED_MOTION_MQ);

    const update = () => {
      setEnabled(!mobile.matches && !reduced.matches);
    };

    update();
    mobile.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}

export function LandingHeroSlides() {
  const [active, setActive] = useState(0);
  const carouselEnabled = useHeroCarouselEnabled();
  const Slide = HERO_SLIDES[active];

  useEffect(() => {
    if (!carouselEnabled) return;

    let intervalId: number | undefined;

    const start = () => {
      if (intervalId !== undefined) return;
      intervalId = window.setInterval(() => {
        setActive((i) => (i + 1) % SLIDE_COUNT);
      }, LANDING_HERO_SLIDE_INTERVAL_MS);
    };

    const stop = () => {
      if (intervalId === undefined) return;
      window.clearInterval(intervalId);
      intervalId = undefined;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [carouselEnabled]);

  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center px-2 py-4 sm:px-4 sm:py-8 md:py-10">
      <div className="relative min-h-[26rem] w-full sm:min-h-160">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={carouselEnabled ? `hero-slide-${active}` : "hero-slide-static"}
            role="group"
            aria-roledescription="slide"
            aria-label={`${active + 1} of ${SLIDE_COUNT}`}
            className="absolute inset-x-0 top-0 w-full"
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
