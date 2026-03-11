"use client";

import React from "react";
import { motion } from "framer-motion";
import type { ColorScheme } from "./InputMethodTemplate";

const STAGES = [
  { id: "checking", label: "Checking document" },
  { id: "processing", label: "Processing document" },
  { id: "chunking", label: "Chunking document" },
  { id: "analyzing", label: "Analyzing document" },
  { id: "finishing", label: "Finishing up" },
];

interface ProcessingIndicatorProps {
  completedCount: number;
  colorScheme?: ColorScheme;
}

interface ColorClasses {
  containerBorder: string;
  containerBg: string;
  containerShadow: string;
  headerText: string;
  headerDotGradient: string;
  headerDotShadow: string;
  completeDotBorder: string;
  completeDotGradient: string;
  completeDotShadow: string;
  completeLineGradient: string;
}

const colorClasses: Record<ColorScheme, ColorClasses> = {
  purple: {
    containerBorder: "border-purple-200/70",
    containerBg: "from-purple-50/80 via-white to-white/80",
    containerShadow: "shadow-[0_12px_30px_rgba(124,58,237,0.12)]",
    headerText: "text-purple-500/80",
    headerDotGradient: "from-fuchsia-400 to-purple-600",
    headerDotShadow: "shadow-[0_0_10px_rgba(168,85,247,0.6)]",
    completeDotBorder: "border-purple-500",
    // completeDotGradient: "from-purple-500 via-fuchsia-500 to-indigo-500",
    completeDotGradient: "bg-purple-500",
    completeDotShadow: "shadow-[0_0_12px_rgba(168,85,247,0.5)]",
    completeLineGradient: "bg-purple-500/70",
  },
  blue: {
    containerBorder: "border-blue-200/70",
    containerBg: "from-blue-50/80 via-white to-white/80",
    containerShadow: "shadow-[0_12px_30px_rgba(59,130,246,0.12)]",
    headerText: "text-blue-500/80",
    headerDotGradient: "from-cyan-400 to-blue-600",
    headerDotShadow: "shadow-[0_0_10px_rgba(59,130,246,0.6)]",
    completeDotBorder: "border-blue-500",
    // completeDotGradient: "from-blue-500 via-cyan-500 to-indigo-500",
    completeDotGradient: "bg-blue-500",
    completeDotShadow: "shadow-[0_0_12px_rgba(59,130,246,0.5)]",
    completeLineGradient: "from-blue-500/70 to-cyan-400/10",
  },
  green: {
    containerBorder: "border-green-200/70",
    containerBg: "from-green-50/80 via-white to-white/80",
    containerShadow: "shadow-[0_12px_30px_rgba(34,197,94,0.12)]",
    headerText: "text-green-500/80",
    headerDotGradient: "from-emerald-400 to-green-600",
    headerDotShadow: "shadow-[0_0_10px_rgba(34,197,94,0.6)]",
    completeDotBorder: "border-green-500",
    // completeDotGradient: "from-green-500 via-emerald-500 to-teal-500",
    completeDotGradient: "bg-green-500",
    completeDotShadow: "shadow-[0_0_12px_rgba(34,197,94,0.5)]",
    completeLineGradient: "from-green-500/70 to-emerald-400/10",
  },
};

const ProcessingIndicator = ({
  completedCount,
  colorScheme = "purple",
}: ProcessingIndicatorProps) => {
  const colors = colorClasses[colorScheme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-6 w-full rounded-2xl border bg-linear-to-b p-4 backdrop-blur ${colors.containerBorder} ${colors.containerBg} ${colors.containerShadow}`}
    >
      <div
        className={`flex  items-center gap-2 text-[11px] uppercase tracking-[0.25em] ${colors.headerText}`}
      >
        <span
          className={`h-2 w-2 rounded-full bg-linear-to-br ${colors.headerDotGradient} ${colors.headerDotShadow}`}
        />
        AI Processing
      </div>
      <div className="borsder flex justify-center">
        <div className="mt-4 space-y-3 bsorder mx-auto">
          {STAGES.map((stage, index) => {
            const isComplete = index <= completedCount;
            const isActive = index === completedCount;
            return (
              <div key={stage.id} className="flex items-start gap-3 jusstify-center">
                <div className="flex flex-col items-center pt-0.5">
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={isActive ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className={`h-3 w-3 rounded-full border ${
                      isComplete
                        ? `${colors.completeDotBorder} bg-linear-to-br ${colors.completeDotGradient} `
                        : "border-gray-300 bg-gray-200"
                    } ${isActive ? "animate-pulse" : ""}`}
                  />
                  {index < STAGES.length - 1 && (
                    <div
                      className={`mt-2 h-6 w-px ${
                        isComplete ? `bg-linear-to-b ${colors.completeLineGradient}` : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
                <motion.p
                  initial={{ x: 0 }}
                  animate={isActive ? { x: [0, 4, 0] } : { x: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className={`text-sm ${isComplete ? "text-gray-900" : "text-gray-400"}`}
                >
                  {stage.label}
                </motion.p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ProcessingIndicator;
