export const easeOut = [0.32, 0.72, 0, 1] as const;
export const easeIn = [0.4, 0, 1, 1] as const;

export const heroSlideContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.06,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

export const slideOneTop = {
  initial: { opacity: 0, x: -56, rotate: -5, scale: 0.92, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.52, ease: easeOut },
  },
  exit: {
    opacity: 0,
    x: -40,
    rotate: 4,
    scale: 0.94,
    filter: "blur(8px)",
    transition: { duration: 0.38, ease: easeIn },
  },
};

export const slideOneBottom = {
  initial: { opacity: 0, y: 48, x: 32, scale: 0.88 },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 26, mass: 0.85 },
  },
  exit: {
    opacity: 0,
    y: 36,
    x: -20,
    scale: 0.9,
    transition: { duration: 0.36, ease: easeIn },
  },
};

export const slideTwoTop = {
  initial: { opacity: 0, scale: 0.82, rotate: 3, filter: "blur(14px)" },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: { duration: 0.58, ease: easeOut },
  },
  exit: {
    opacity: 0,
    scale: 1.06,
    rotate: -2,
    y: -24,
    filter: "blur(10px)",
    transition: { duration: 0.4, ease: easeIn },
  },
};

export const slideTwoBottom = {
  initial: { opacity: 0, x: 64, skewX: -6, scale: 0.94 },
  animate: {
    opacity: 1,
    x: 0,
    skewX: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 320, damping: 28 },
  },
  exit: {
    opacity: 0,
    x: 48,
    skewX: 4,
    scale: 0.96,
    transition: { duration: 0.34, ease: easeIn },
  },
};

export const slideThreeTop = {
  initial: { opacity: 0, y: -44, scale: 0.93, filter: "blur(12px)" },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: -28,
    scale: 1.02,
    filter: "blur(8px)",
    transition: { duration: 0.36, ease: easeIn },
  },
};

export const slideThreeBottom = {
  initial: { opacity: 0, y: 52, scale: 0.9 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 280, damping: 28 },
  },
  exit: {
    opacity: 0,
    y: 36,
    scale: 0.92,
    transition: { duration: 0.34, ease: easeIn },
  },
};

export const slideFourTop = {
  initial: { opacity: 0, x: 52, rotate: 4, scale: 0.9, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.52, ease: easeOut },
  },
  exit: {
    opacity: 0,
    x: 36,
    rotate: -3,
    scale: 0.94,
    filter: "blur(8px)",
    transition: { duration: 0.36, ease: easeIn },
  },
};

export const slideFourBottom = {
  initial: { opacity: 0, x: -56, skewX: 5, scale: 0.94 },
  animate: {
    opacity: 1,
    x: 0,
    skewX: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 27 },
  },
  exit: {
    opacity: 0,
    x: -40,
    skewX: -3,
    scale: 0.96,
    transition: { duration: 0.34, ease: easeIn },
  },
};
