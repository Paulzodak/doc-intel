"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import heroBackground from "@/assets/images/contact_us_hero.jpg";

type ContactUsImageColumnProps = {
  compact?: boolean;
};

/**
 * Right column for contact-us: full-bleed visual with brand atmosphere.
 */
export function ContactUsImageColumn({ compact = false }: ContactUsImageColumnProps) {
  return (
    <div className="relative flex min-h-0 flex-1">
      <div
        className={[
          "w-full flex-1 self-start",
          compact ? "relative" : "sticky top-14 sm:top-20",
        ].join(" ")}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={[
            "relative isolate w-full overflow-hidden rounded-3xl sm:rounded-[2rem]",
            compact
              ? "min-h-[16rem] sm:min-h-[20rem]"
              : "min-h-[min(40rem,85vh)] sm:min-h-[min(80rem,85vh)]",
          ].join(" ")}
        >
          <Image
            src={heroBackground}
            alt="Workspace atmosphere for contacting Qlarety"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#11161f] via-[#11161f]/55 to-[#11161f]/20"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-green/25 via-transparent to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(71,225,140,0.35) 1px, transparent 0)",
              backgroundSize: "26px 26px",
            }}
          />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-8 top-16 h-40 w-40 rounded-full bg-primary-green/30 blur-3xl"
            animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <div className="mb-3 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-green opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-green" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-green">
                Typically replies in 24h
              </span>
            </div>
            <p className="max-w-sm font-lora text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl">
              Legal teams use Qlarety to move from document to decision faster.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/55">
              <span>Risk grading</span>
              <span>Compliance</span>
              <span>Contract review</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
