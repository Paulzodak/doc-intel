"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiInfo } from "react-icons/fi";
import type { Highlight } from "@/types/analysis";
import { Button } from "../ui/button";

interface HighlightDetailsModalProps {
  highlight: Highlight | null;
  isOpen: boolean;
  onClose: () => void;
}

const HighlightDetailsModal: React.FC<HighlightDetailsModalProps> = ({
  highlight,
  isOpen,
  onClose,
}) => {
  if (!highlight) return null;

  const typeColors = {
    risk: {
      bg: "bg-red-100",
      border: "border-red-300",
      text: "text-red-900",
      badge: "bg-red-500",
    },
    advantage: {
      bg: "bg-green-100",
      border: "border-green-300",
      text: "text-green-900",
      badge: "bg-green-500",
    },
    compliance: {
      bg: "bg-yellow-100",
      border: "border-yellow-300",
      text: "text-yellow-900",
      badge: "bg-yellow-500",
    },
  };

  const colors = typeColors[highlight.type];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Modal - Centered */}
          <div className="lg:hidden  fixed inset-0 z-50 flex items-center justify-center p-4 font-jakarta">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-black/50 z-10 backdrop-blur-sm "
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden z-20"
            >
              {/* Header */}
              <div className={`${colors.bg} ${colors.border} border-b-2 p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`${colors.badge} w-3 h-3 rounded-full`} />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 capitalize">
                        {highlight.type} Highlight
                      </h3>
                      <p className="text-xs text-gray-600 mt-0.5">Tap outside to close</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <FiX className="text-gray-700" size={20} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {/* Highlighted Text */}
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase mb-2 block">
                      Highlighted Text
                    </span>
                    <div className={`${colors.bg} ${colors.border} border-2 rounded-lg p-4`}>
                      <p className={`text-sm font-medium ${colors.text}`}>{highlight.text}</p>
                    </div>
                  </div>

                  {/* Description */}
                  {highlight.description && (
                    <div>
                      <span className="text-xs font-semibold text-gray-500 uppercase mb-2 block">
                        Description
                      </span>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Type Badge */}
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase mb-2 block">
                      Category
                    </span>
                    <div className="flex items-center gap-2">
                      <div className={`${colors.badge} w-2 h-2 rounded-full`} />
                      <span className={`text-sm font-semibold capitalize ${colors.text}`}>
                        {highlight.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <Button
                  onClick={onClose}
                  className="w-full py-3 px-4 text-sm bg-white rounded-full border-gray-300 shadow-none text-gray-500 font-semibold   transition-all"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HighlightDetailsModal;
