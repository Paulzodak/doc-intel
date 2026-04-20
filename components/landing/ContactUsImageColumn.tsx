"use client";

import Image from "next/image";
import heroBackground from "@/assets/images/contact_us_hero.jpg";
/**
 * Right column for contact-us: sticky panel with image, matching {@link LandingHeroVisualColumn} layout.
 */
export function ContactUsImageColumn() {
  return (
    <div className="relative flex min-h-0 flex-1">
      <div className="sticky top-14 w-full flex-1 self-start sm:top-20">
        <div
          className={[
            "relative isolate min-h-[min(40rem,85vh)] sm:min-h-[min(80rem,85vh)] w-full overflow-hidden rounded-3xl border border-gray-200/50 dark:border-white/10 sm:rounded-4xl",
            "[clip-path:inset(0_round_1rem)] sm:[clip-path:inset(0_round_2rem)]",
          ].join(" ")}
        >
          <Image
            src={heroBackground}
            alt="Abstract grid texture"
            fill
            className="object-cover object-center opacity-80 dark:opacity-70"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary-green/15 via-transparent to-violet-600/10 dark:from-primary-green/20 dark:to-violet-900/20"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-white/15 dark:from-black/50 dark:to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
