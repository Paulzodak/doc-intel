"use client";

import React from "react";
import { motion } from "framer-motion";

export interface GradingCardProps {
  label: string;
  score: number;
  icon: React.ElementType;
}

export const GradingCard: React.FC<GradingCardProps> = ({ label, score, icon: Icon }) => {
  const getGradingColor = (score: number) => {
    if (score >= 70) return { text: "text-green-600", bg: "bg-green-500", label: "Good" };
    if (score >= 40) return { text: "text-yellow-600", bg: "bg-yellow-500", label: "Fair" };
    return { text: "text-red-600", bg: "bg-red-500", label: "Poor" };
  };
  const colors = getGradingColor(score);
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className=" backdrop-blur-sm rounded-xl p-4 border border-neutral-200 bg-neutral-50 shadsow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className={colors.text} size={20} />
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
        <span className={`text-lg font-bold ${colors.text}`}>{score}/100</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full ${colors.bg} rounded-full`}
        />
      </div>
      <span className="text-xs text-gray-500 mt-1 block">{colors.label}</span>
    </motion.div>
  );
};
