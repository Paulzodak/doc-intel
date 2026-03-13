"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiInfo } from "react-icons/fi";
import { useSelector } from "react-redux";
import type { DocumentAnalysis } from "@/types/analysis";
import { selectSelectedHighlight } from "@/redux/slices/document/documentContent.slice";

export interface DetailsPanelProps {
  analysis: DocumentAnalysis;
}

export const DetailsPanel: React.FC<DetailsPanelProps> = () => {
  const selectedHighlight = useSelector(selectSelectedHighlight);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 hidden lg:block"
    >
      {selectedHighlight ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-blue-400 shadow-lg"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiInfo className="text-blue-500" />
            Highlight Details
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase">Type</span>
              <p className="text-sm font-medium text-gray-900 capitalize mt-1">
                {selectedHighlight.type}
              </p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase">Text</span>
              <p className="text-sm text-gray-700 mt-1 bg-gray-50 p-2 rounded">
                {selectedHighlight.text}
              </p>
            </div>
            {selectedHighlight.description && (
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase">Description</span>
                <p className="text-sm text-gray-700 mt-1 bg-gray-50 p-2 rounded">
                  {selectedHighlight.description}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <FiInfo className="text-gray-400 mx-auto mb-2" size={32} />
          <p className="text-gray-500 text-sm">Select a highlight to view details</p>
        </div>
      )}
    </motion.div>
  );
};
