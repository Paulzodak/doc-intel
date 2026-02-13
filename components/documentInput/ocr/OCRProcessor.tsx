"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { OCRProgress } from "@/hooks/useTesseractOCR";

interface OCRProcessorProps {
  progress: OCRProgress;
  isProcessing: boolean;
}

export const OCRProcessor: React.FC<OCRProcessorProps> = ({
  progress,
  isProcessing,
}) => {
  if (!isProcessing) return null;

  const progressPercentage = Math.round(progress.progress * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <Loader2 className="w-6 h-6 text-primary-green animate-spin" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {progress.status || "Processing image..."}
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-primary-green rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
