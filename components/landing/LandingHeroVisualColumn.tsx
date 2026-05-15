"use client";

import { LandingHeroSlides } from "@/components/landing/productFeatures";

/**
 * Sticky hero panel with gradient orbs.
 * Heavy filter/backdrop blurs are desktop-only — on mobile they stall compositing
 * when a fixed overlay (e.g. nav menu) draws on top.
 */
export function LandingHeroVisualColumn() {
  return (
    <div className="relative flex min-h-0 flex-1">
      <div className="sticky top-14 w-full flex-1 self-start sm:top-20">
        <div
          className={[
            "relative isolate min-h-[22rem] w-full overflow-hidden rounded-3xl border border-gray-200/50 dark:border-white/10 sm:min-h-[40rem] sm:rounded-4xl",
            "md:transform-gpu md:[clip-path:inset(0_round_1rem)] lg:[clip-path:inset(0_round_2rem)]",
          ].join(" ")}
        >
          {/* Gradient orbs — no filter blur on mobile (GPU killer with fixed overlays) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
            <div
              aria-hidden
              className="absolute left-0 top-[-15%] h-[85%] w-[85%] rounded-full bg-linear-to-br from-green-600/25 via-green-600/10 to-green-950/5 md:from-green-600/20 md:via-green-600/5 md:blur-[1000px]"
            />
            <div
              aria-hidden
              className="absolute right-0 top-[5%] h-[75%] w-[75%] rounded-full bg-linear-to-bl from-violet-600/15 via-fuchsia-600/10 to-purple-950/5 md:from-violet-600/5 md:via-fuchsia-600/5 md:blur-[1000px]"
            />
            <div
              aria-hidden
              className="absolute bottom-0 left-0 h-[70%] w-[95%] rounded-full bg-linear-to-t from-cyan-500/15 via-sky-600/10 to-indigo-950/5 md:from-cyan-500/5 md:via-sky-600/5 md:blur-[1000px]"
            />
            <div
              aria-hidden
              className="absolute inset-[12%] rounded-[2.5rem] bg-linear-to-tr from-primary-green/10 via-blue-400/10 to-transparent md:from-primary-green/5 md:via-blue-400/5 md:blur-[1000px]"
            />
            <div className="absolute inset-0 rounded-[inherit] bg-linear-to-b from-white/90 via-white/85 to-white/80 md:from-white/5 md:via-white/5 md:to-white/4 md:backdrop-blur-md dark:from-zinc-950/90 dark:via-zinc-950/85 dark:to-zinc-950/80 md:dark:from-black/25 md:dark:via-black/10 md:dark:to-transparent md:dark:backdrop-blur-xl" />
          </div>
          <div className="relative z-10 flex h-full min-h-0 flex-col">
            <LandingHeroSlides />
          </div>
        </div>
      </div>
    </div>
  );
}
