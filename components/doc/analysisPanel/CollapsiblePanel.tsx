"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

export interface CollapsiblePanelProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({
  title,
  isExpanded,
  onToggle,
  children,
}) => {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors"
      >
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FiChevronDown className="text-gray-600" size={20} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
