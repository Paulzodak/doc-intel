"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiInfo } from "react-icons/fi";
import { useSelector } from "react-redux";
import type { DocumentAnalysis } from "@/types/analysis";
import { selectSelectedHighlight } from "@/redux/slices/document/documentContent.slice";
import { Copy } from "lucide-react";
import { ExportResponseButton } from "./Chat/ExportResponseButton";
import { ThumbsUpIcon } from "@/assets/svg/ThumbsUpIcon";
import { ThumbsDownIcon } from "@/assets/svg/ThumbsDownIcon";
import { ExportDetailButton } from "./Detail/ExportDetailButton";
import { RenderHighlightDetails } from "./Detail/RenderHightlightDetail";

export interface DetailsPanelProps {
  analysis: DocumentAnalysis;
}

export const DetailsPanel: React.FC<DetailsPanelProps> = () => {
  const selectedHighlight = useSelector(selectSelectedHighlight);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 hidden lg:block p-2 sm:p-4 "
    >
      {selectedHighlight ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-green-700 shadow-lg"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiInfo className="text-green-700" />
            Highlight Details
          </h3>
          <RenderHighlightDetails className="p-0" highlightData={selectedHighlight} />
          {selectedHighlight.text && (
            <div className="mt-2 flex items-center gap-2 text-gray-500">
              <button
                type="button"
                className="p-[5px] rounded hover:bg-gray-100 transition-colors"
                aria-label="Copy"
              >
                <Copy size={14} />
              </button>
              <button
                type="button"
                className="p-[5px] rounded hover:bg-gray-100 transition-colors"
                aria-label="Thumbs up"
              >
                <ThumbsUpIcon size={16} color="#6a7282" />
              </button>
              <button
                type="button"
                className="p-[5px] rounded hover:bg-gray-100 transition-colors"
                aria-label="Thumbs down"
              >
                <ThumbsDownIcon size={16} color="#6a7282" />
              </button>
              <button
                type="button"
                className="p-[5px] rounded hover:bg-gray-100 transition-colors"
                aria-label="Export"
              >
                <ExportDetailButton highlightData={selectedHighlight} />
              </button>
            </div>
          )}
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
