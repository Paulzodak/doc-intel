"use client";

import { LandingHeroSlides } from "@/components/landing/productFeatures";

/**
 * Sticky hero panel with gradient orbs. Safari often ignores overflow:hidden for
 * filter:blur() descendants; clip-path + isolate + inner overflow clip fixes it.
 */
export function LandingHeroVisualColumn() {
  return (
    <div className="relative flex min-h-0 flex-1">
      <div className="sticky top-14 w-full flex-1 self-start sm:top-20">
        <div
          className={[
            "relative isolate min-h-[40rem] w-full transform-gpu overflow-hidden rounded-3xl border border-gray-200/50 dark:border-white/10  sm:rounded-4xl",
            "[clip-path:inset(0_round_1rem)] sm:[clip-path:inset(0_round_2rem)]",
          ].join(" ")}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
            <div
              aria-hidden
              className="absolute left-0 top-[-15%] h-[85%] w-[85%] rounded-full bg-linear-to-br from-green-600/20 via-green-600/5 to-green-950/5 blur-[1000px]"
            />
            <div
              aria-hidden
              className="absolute right-0 top-[5%] h-[75%] w-[75%] rounded-full bg-linear-to-bl from-violet-600/5 via-fuchsia-600/5 to-purple-950/5 blur-[1000px]"
            />
            <div
              aria-hidden
              className="absolute bottom-0 left-0 h-[70%] w-[95%] rounded-full bg-linear-to-t from-cyan-500/5 via-sky-600/5 to-indigo-950/5 blur-[1000px]"
            />
            <div
              aria-hidden
              className="absolute inset-[12%] rounded-[2.5rem] bg-linear-to-tr from-primary-green/5 via-blue-400/5 to-transparent blur-[1000px]"
            />
            <div className="absolute inset-0 rounded-[inherit] bg-linear-to-b from-white/5 via-white/5 to-white/4 backdrop-blur-md dark:from-black/25 dark:via-black/10 dark:to-transparent dark:backdrop-blur-xl" />
          </div>
          <div className="relative z-10 flex h-fusll min-h-0 flex-col">
            <LandingHeroSlides />
          </div>
        </div>
      </div>
    </div>
  );
}
