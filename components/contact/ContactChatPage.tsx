"use client";

import { motion } from "framer-motion";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingNav } from "@/components/landing/LandingNav";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
import { MailIcon } from "@/assets/svg/MailIcon";
import { PhoneIcon } from "@/assets/svg/PhoneIcon";
import { SupportChatShell } from "./SupportChatShell";

const REACH_OUT = [
  {
    icon: PhoneIcon,
    title: "Call",
    detail: "+234 (816) 844-7706",
    href: "tel:+2348168447706",
  },
  {
    icon: MailIcon,
    title: "Email",
    detail: "contact@qlarety.com",
    href: "mailto:contact@qlarety.com",
  },
  {
    icon: MailIcon,
    title: "Visit",
    detail: "Lagos, Nigeria",
    href: "https://maps.app.goo.gl/1234567890",
  },
] as const;

export function ContactChatPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#fbfcfb] font-nunito dark:bg-[#0b0f14]">
      <div className="relative">
        {/* <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-primary-green/15 blur-3xl"
        /> */}
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

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 pb-10 pt-8 sm:px-8 sm:pt-10 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 w-full max-w-xl text-center sm:mb-8"
          >
            <div className="mb-3 flex items-center justify-center gap-1">
              <QlaretyLogo width={48} height={48} shouldNavigate={false} />
              <span className="font-lora text-2xl font-semibold tracking-tight text-[#11161f] dark:text-white">
                larety
              </span>
            </div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-green">
              Contact
            </p>
            <h1 className="font-lora text-4xl font-medium leading-[1.08] tracking-tight text-[#11161f] dark:text-white sm:text-5xl">
              Talk with Qlarety
            </h1>
            <p className="mx-auto mt-3 max-w-md font-brockmann text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400 sm:text-[15px]">
              An always-on assistant for product questions, demos, and account help — with a clean
              handoff to humans when you need one.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <SupportChatShell />
          </motion.div>
        </div>
      </div>

      <section className="relative mx-auto max-w-[95rem] px-6 pb-4 pt-8 md:px-20 lg:px-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1e2939]/15 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-green">
              Direct lines
            </p>
            <h2 className="mt-3 font-lora text-3xl font-medium tracking-tight text-[#11161f] dark:text-white sm:text-4xl">
              Prefer to reach out yourself?
            </h2>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Write us at{" "}
              <a
                href="mailto:contact@qlarety.com"
                className="font-semibold text-[#11161f] underline decoration-primary-green/50 underline-offset-4 transition-colors hover:text-primary-green dark:text-white"
              >
                contact@qlarety.com
              </a>
            </p>
          </div>

          <div className="grid flex-1 gap-6 sm:grid-cols-3 lg:max-w-2xl">
            {REACH_OUT.map((method) => {
              const Icon = method.icon;
              return (
                <a
                  key={method.title}
                  href={method.href}
                  className="group block  pt-4 transition-colors hover:border-primary-green/50 dark:border-white/10"
                >
                  <div className="mb-3 text-primary-green transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon color="#47e18c" />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                    {method.title}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-[#11161f] dark:text-white">
                    {method.detail}
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>
      </section>

      <LandingFooter />
    </div>
  );
}
