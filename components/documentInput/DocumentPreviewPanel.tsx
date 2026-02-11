"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExtractedTextBlock } from "@/components/atoms/ExtractedTextBlock";
import { FilePreviewItem } from "@/components/atoms/FilePreviewItem";

export interface PreviewFileItem {
  id: string;
  fileName: string;
  text: string;
  isLoading?: boolean;
  error?: string;
}

interface DocumentPreviewPanelProps {
  files: PreviewFileItem[];
  onClose: () => void;
  className?: string;
}

export const DocumentPreviewPanel = ({
  files,
  onClose,
  className,
}: DocumentPreviewPanelProps) => {
  const hasMultiple = files.length > 1;
  const allLoaded = files.every((f) => !f.isLoading);
  const hasAnyContent = files.some((f) => f.text.trim().length > 0 || f.error);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 overflow-hidden">
        {/* Panel header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {hasMultiple ? `Extracted text (${files.length} files)` : "Extracted text"}
          </h4>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>

        {/* Content: single file vs multiple with indicators */}
        <div className="p-3 space-y-3 max-h-[420px] overflow-y-auto">
          <AnimatePresence mode="wait">
            {!hasMultiple && files[0] ? (
              <motion.div
                key={files[0].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {files[0].error ? (
                  <p className="text-sm text-red-600 dark:text-red-400">{files[0].error}</p>
                ) : files[0].isLoading ? (
                  <div className="flex items-center justify-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                    Extracting text…
                  </div>
                ) : (
                  <ExtractedTextBlock
                    text={files[0].text}
                    maxHeight={320}
                    placeholder="No text extracted."
                  />
                )}
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 truncate">
                  {files[0].fileName}
                </p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {files.map((file, index) => (
                  <FilePreviewItem
                    key={file.id}
                    label={file.fileName}
                    text={file.text}
                    index={index + 1}
                    isLoading={file.isLoading}
                    error={file.error}
                    textBlockMaxHeight={200}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {allLoaded && hasAnyContent && (
          <p className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
            Preview is from plain-text extraction. PDF and binary formats show a placeholder.
          </p>
        )}
      </div>
    </motion.div>
  );
};
