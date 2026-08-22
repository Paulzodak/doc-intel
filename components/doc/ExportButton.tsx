"use client";

import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DownloadIcon } from "@/assets/svg/DownloadIcon";
import { Document } from "@/types/document";
import { useRenderHighlightedHtml } from "./docContent/useRenderHighlightedHtml";
import { DownloadButton } from "./DownloadButton";
export type VisibilityOption = 1 | 2 | 3;

interface ExportButtonProps {
  className?: string;
  docData: Document;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ docData, className }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const htmlRenderText = useRenderHighlightedHtml(
    docData.inputText,
    docData.result?.analyzeChunkResults?.flatMap((chunk) => chunk.highlights || []),
  );

  return (
    <div ref={ref} className={clsx("", className)}>
      <button
        type="button"
        // onClick={handleExport}
        onClick={() => setShowDropdown((v) => !v)}
        className=" flex bg-neutral-50 border  border-gray-200 gap-2 text-gray-500 items-center px-2 py-1 rounded-full hover:bg-gray-50 transition-colors"
      >
        <DownloadIcon size={15} />
        <span>Export content</span>
      </button>
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            key="export-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-10 flex items-center justify-center p-4"
            onClick={() => setShowDropdown(false)}
          >
            <div className="absolute inset-0 bg-black/50" aria-hidden />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-[500px] bg-white border border-gray-200 rounded-4xl shadow-xl shadow-black/20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-1 p-4 sm:p-6 sm:px-8">
                <div className="w-full flex items-center gap-2  text-left  text-gray-700 hover:bg-gray-50 disabled:opacity-70 disabled:pointer-events-none">
                  {/* <DownloadIcon size={20} /> */}
                  <span className="mt-4  sm:mt-0 text-center mx-auto font-bold font-brockmann text-lg sm:text-xl">
                    {docData.documentName}
                  </span>
                </div>
                <div className="max-h-[300px] relative overflow-hidden border border-gray-200 rounded-2xl mt-4 shadow">
                  <div dangerouslySetInnerHTML={{ __html: htmlRenderText }} />
                </div>
              </div>
              <DownloadButton htmlRenderText={htmlRenderText} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
