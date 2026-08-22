"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundUp } from "react-icons/io";
import { ArrowLeftIcon } from "@/assets/svg/ArrowLeftIcon";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";

const TESTIMONIALS = [
  {
    name: "Sarah L.",
    title: "In-house Counsel",
    testimonial:
      "Cuts contract review time by more than half. Risk and compliance scores are spot-on.",
  },
  {
    name: "James K.",
    title: "Legal Operations",
    testimonial:
      "We use it for every NDA and vendor agreement. Highlights surface issues we used to miss.",
  },
  {
    name: "Elena M.",
    title: "Compliance Officer",
    testimonial:
      "Clear grading and key points make it easy to brief stakeholders. A real time-saver.",
  },
] as const;

export function AuthBrandingPanel() {
  const router = useRouter();

  return (
    <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#11161fd9] backdrop-blur-3xl">
      <motion.button
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
        className="group absolute top-8 left-8 z-20 flex items-center gap-3 cursor-pointer outline-none"
        onClick={() => router.push("/")}
        aria-label="Back to home"
      >
        <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#47e18c]/25 bg-[#0e131c]/80 shadow-[0_0_0_1px_rgba(6,42,22,0.5),0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 group-hover:border-[#47e18c]/55 group-hover:shadow-[0_0_20px_rgba(71,225,140,0.15)]">
          <motion.span
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(71,225,140,0.18),transparent_65%)]"
            variants={{ hover: { opacity: 1 } }}
            initial={{ opacity: 0.5 }}
          />
          <motion.span
            className="relative z-10 text-[#47e18c]"
            variants={{ hover: { x: -3 } }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            <ArrowLeftIcon className="w-4 h-4" size={16} color="#47e18c" />
          </motion.span>
        </span>
        <span className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#47e18c]/70 transition-colors duration-300 group-hover:text-[#47e18c]">
            Return
          </span>
          <span className="mt-1 text-sm font-medium text-white/90 transition-colors duration-300 group-hover:text-white">
            Home
          </span>
        </span>
      </motion.button>

      <div className="relative z-10 flex flex-col justify-center items-center px-12 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 text-center"
        >
          <h1 className="text-2xl md:text-3xl font-black text-white/90 mb-4 flex items-center justify-center leading-tight">
            <QlaretyLogo width={60} height={60} />
            larety
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-16 flex items-center justify-center w-full max-w-[340px] pb-6"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0"
            animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.06, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#47e18c]/15 blur-3xl" />
          </motion.div>

          <svg
            viewBox="0 0 320 400"
            className="relative z-10 h-auto w-full drop-shadow-[0_20px_60px_rgba(71,225,140,0.12)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <linearGradient
                id="authDocFace"
                x1="60"
                y1="40"
                x2="260"
                y2="360"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1a2332" />
                <stop offset="1" stopColor="#0e131c" />
              </linearGradient>
              <linearGradient id="authScanBeam" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#47e18c" stopOpacity="0" />
                <stop offset="0.5" stopColor="#47e18c" stopOpacity="0.85" />
                <stop offset="1" stopColor="#47e18c" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="authRiskArc" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop stopColor="#47e18c" />
                <stop offset="1" stopColor="#6ae8a8" />
              </linearGradient>
              <filter id="authGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <clipPath id="authDocClip">
                <rect x="72" y="48" width="176" height="248" rx="18" />
              </clipPath>
            </defs>

            <rect
              x="88"
              y="64"
              width="176"
              height="248"
              rx="18"
              fill="#0a0e14"
              stroke="#062a16"
              strokeWidth="1"
              opacity="0.55"
              transform="rotate(4 176 188)"
            />
            <rect
              x="80"
              y="56"
              width="176"
              height="248"
              rx="18"
              fill="#10161f"
              stroke="#0a3d22"
              strokeWidth="1"
              opacity="0.8"
              transform="rotate(2 168 180)"
            />

            <rect
              x="72"
              y="48"
              width="176"
              height="248"
              rx="18"
              fill="url(#authDocFace)"
              stroke="#0f3d26"
              strokeWidth="1.5"
            />

            <g opacity="0.9">
              <rect x="94" y="78" width="88" height="8" rx="4" fill="#2a3548" />
              <rect x="94" y="100" width="132" height="5" rx="2.5" fill="#243044" />
              <rect x="94" y="114" width="118" height="5" rx="2.5" fill="#243044" />
              <rect x="94" y="128" width="126" height="5" rx="2.5" fill="#243044" />
              <rect x="94" y="152" width="70" height="5" rx="2.5" fill="#2a3548" />
              <rect x="94" y="166" width="132" height="5" rx="2.5" fill="#243044" />
              <rect x="94" y="180" width="100" height="5" rx="2.5" fill="#243044" />
              <rect x="94" y="204" width="56" height="5" rx="2.5" fill="#2a3548" />
              <rect x="94" y="218" width="120" height="5" rx="2.5" fill="#243044" />
              <rect x="94" y="232" width="108" height="5" rx="2.5" fill="#243044" />
              <rect x="94" y="246" width="90" height="5" rx="2.5" fill="#243044" />
            </g>

            <rect x="94" y="126" width="90" height="9" rx="3" fill="#47e18c" opacity="0.18" />
            <rect x="94" y="178" width="72" height="9" rx="3" fill="#47e18c" opacity="0.12" />

            <g clipPath="url(#authDocClip)">
              <motion.rect
                x="72"
                width="176"
                height="28"
                fill="url(#authScanBeam)"
                initial={{ y: 48 }}
                animate={{ y: [48, 268, 48] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ mixBlendMode: "screen" }}
              />
              <motion.line
                x1="72"
                x2="248"
                stroke="#47e18c"
                strokeWidth="1.5"
                filter="url(#authGlow)"
                initial={{ y1: 62, y2: 62 }}
                animate={{ y1: [62, 282, 62], y2: [62, 282, 62] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </g>

            <path
              d="M84 64 H98 M84 64 V78"
              stroke="#47e18c"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M236 64 H222 M236 64 V78"
              stroke="#47e18c"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M84 280 H98 M84 280 V266"
              stroke="#47e18c"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d="M236 280 H222 M236 280 V266"
              stroke="#47e18c"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.5"
            />

            <g transform="translate(230 300)">
              <circle r="42" fill="#0e131c" stroke="#0a3d22" strokeWidth="1.5" />
              <circle r="34" fill="none" stroke="#1a2a22" strokeWidth="5" />
              <motion.circle
                r="34"
                fill="none"
                stroke="url(#authRiskArc)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="213.6"
                initial={{ strokeDashoffset: 213.6 }}
                animate={{ strokeDashoffset: 52 }}
                transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                transform="rotate(-90)"
                filter="url(#authGlow)"
              />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fill="#47e18c"
                fontSize="18"
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
              >
                A−
              </text>
              <text
                y="18"
                textAnchor="middle"
                fill="#6b7a8d"
                fontSize="7"
                fontFamily="system-ui, sans-serif"
                letterSpacing="0.08em"
              >
                RISK
              </text>
            </g>

            <g transform="translate(48 318)">
              <rect width="52" height="26" rx="8" fill="#121820" stroke="#0a3d22" strokeWidth="1" />
              <text
                x="26"
                y="17"
                textAnchor="middle"
                fill="#9aa8b8"
                fontSize="9"
                fontWeight="600"
                fontFamily="system-ui, sans-serif"
              >
                PDF
              </text>
            </g>
            <g transform="translate(108 328)">
              <rect width="58" height="26" rx="8" fill="#121820" stroke="#0a3d22" strokeWidth="1" />
              <text
                x="29"
                y="17"
                textAnchor="middle"
                fill="#9aa8b8"
                fontSize="9"
                fontWeight="600"
                fontFamily="system-ui, sans-serif"
              >
                DOCX
              </text>
            </g>

            <motion.circle
              cx="56"
              cy="120"
              r="3"
              fill="#47e18c"
              animate={{ opacity: [0.3, 1, 0.3], cy: [118, 124, 118] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="268"
              cy="160"
              r="2.5"
              fill="#6ae8a8"
              animate={{ opacity: [0.2, 0.9, 0.2], cx: [266, 272, 266] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
          </svg>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="absolute -bottom-2 left-0 right-0 text-center text-sm text-gray-400 tracking-wide"
          >
            Risk &amp; compliance grading in seconds
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex gap-4 mt-8"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
              className="bg-primary-blue-dark border-[2px] border-[#062a16] rounded-2xl p-4 min-w-[180px] relative shadow-2xl shadow-[#082013]"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-gray-400 text-xs">{testimonial.title}</div>
                </div>
              </div>
              <div className="text-gray-400 text-xs font-medium mb-2">
                {testimonial.testimonial}
              </div>
              <div className="absolute bottom-2 right-3 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                <IoIosArrowRoundUp size={15} className="text-primary-blue-dark rotate-45" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
