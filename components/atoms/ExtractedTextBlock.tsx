import clsx from "clsx";
import React from "react";

interface ExtractedTextBlockProps {
  text: string;
  className?: string;
  /** Max height in pixels for scrollable area (default: 280) */
  maxHeight?: number;
  placeholder?: string;
}

export const ExtractedTextBlock = ({
  text,
  className,
  maxHeight = 280,
  placeholder = "No text extracted.",
}: ExtractedTextBlockProps) => {
  const isEmpty = !text || text.trim() === "";

  return (
    <div
      className={clsx(
        "rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 overflow-hidden",
        className
      )}
    >
      <div
        style={{ maxHeight: `${maxHeight}px` }}
        className="overflow-y-auto p-3 text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono wrap-break-word"
      >
        {isEmpty ? (
          <span className="text-gray-500 dark:text-gray-400 italic">{placeholder}</span>
        ) : (
          text
        )}
      </div>
    </div>
  );
};
