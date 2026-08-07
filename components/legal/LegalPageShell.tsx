"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  alternate: { label: string; href: string };
  sections: LegalSection[];
};

export function LegalPageShell({
  eyebrow,
  title,
  description,
  lastUpdated,
  alternate,
  sections,
}: LegalPageShellProps) {
  return (
    <div className="min-h-screen font-nunito overflow-hidden bg-[#fbfcfb] dark:bg-[#0b0f14]">
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-gradient-to-b from-primary-green/10 via-transparent to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-primary-green/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-[#1e2939]/8 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(30,41,57,0.1) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative mx-auto max-w-[110rem] px-4 pt-4 sm:px-8 lg:px-14">
          <LandingNav />
        </div>

        <header className="relative mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-8 sm:pb-14 sm:pt-14 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-5 flex items-center gap-1">
              <QlaretyLogo width={48} height={48} />
              <span className="font-lora text-2xl font-semibold tracking-tight text-[#11161f] dark:text-white">
                larety
              </span>
            </div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-green">
              {eyebrow}
            </p>
            <h1 className="font-lora text-4xl font-medium leading-[1.08] tracking-tight text-[#11161f] dark:text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl font-brockmann text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base">
              {description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500">
              <span>
                Last updated{" "}
                <time className="font-semibold text-[#11161f] dark:text-white">{lastUpdated}</time>
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:inline-block" />
              <Link
                href={alternate.href}
                className="font-medium text-[#11161f] underline decoration-primary-green/40 underline-offset-4 transition-colors hover:text-primary-green dark:text-white"
              >
                {alternate.label}
              </Link>
            </div>
          </motion.div>
        </header>
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 sm:px-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14 lg:px-14 lg:pb-24">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1 border-l border-[#1e2939]/10 pl-4 dark:border-white/10">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
              On this page
            </p>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block py-1.5 text-sm text-gray-500 transition-colors hover:text-[#11161f] dark:hover:text-white"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0 space-y-12 sm:space-y-14"
        >
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <div className="mb-4 flex items-baseline gap-3">
                <span className="font-mono text-[11px] font-medium text-primary-green">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-lora text-2xl font-medium tracking-tight text-[#11161f] dark:text-white sm:text-[1.75rem]">
                  {section.title}
                </h2>
              </div>
              <div className="space-y-4 border-t border-[#1e2939]/08 pt-5 font-brockmann text-[15px] font-light leading-relaxed text-gray-600 dark:border-white/10 dark:text-gray-300">
                {section.content}
              </div>
            </section>
          ))}

          <div className="rounded-3xl border border-primary-green/20 bg-gradient-to-br from-[#11161f] to-[#1a2332] px-6 py-7 text-white sm:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-green">
              Questions
            </p>
            <p className="mt-2 font-lora text-xl font-medium sm:text-2xl">
              Need clarity on how we handle your documents?
            </p>
            <p className="mt-2 max-w-xl text-sm text-white/60">
              Reach our team at{" "}
              <a
                href="mailto:contact@qlarety.com"
                className="text-primary-green underline decoration-primary-green/40 underline-offset-4"
              >
                contact@qlarety.com
              </a>{" "}
              or visit the{" "}
              <Link href="/contact-us" className="text-white underline underline-offset-4">
                contact page
              </Link>
              .
            </p>
          </div>
        </motion.article>
      </div>

      <LandingFooter />
    </div>
  );
}

export function LegalList({ items }: { items: Array<string | ReactNode> }) {
  return (
    <ul className="space-y-2.5 pl-1">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-green" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
