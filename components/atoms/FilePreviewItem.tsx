import clsx from "clsx";
import React from "react";
import { ExtractedTextBlock } from "./ExtractedTextBlock";

export interface FilePreviewItemProps {
  /** Display label (e.g. file name) */
  label: string;
  /** Extracted text content */
  text: string;
  /** Optional index for multi-file indicator (e.g. "1", "2") */
  index?: number;
  /** Whether extraction is still in progress */
  isLoading?: boolean;
  /** Error message if extraction failed */
  error?: string;
  className?: string;
  textBlockMaxHeight?: number;
}

export const FilePreviewItem = ({
  label,
  text,
  index,
  isLoading,
  error,
  className,
  textBlockMaxHeight = 240,
}: FilePreviewItemProps) => {
  return (
    <div
      className={clsx(
        "rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 overflow-hidden",
        className
      )}
    >
      {/* File indicator header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-100/80 dark:bg-gray-800/80">
        {index != null && (
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold"
            aria-hidden
          >
            {index}
          </span>
        )}
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate flex-1 min-w-0">
          {label}
        </span>
      </div>

      {/* Content */}
      <div className="p-2">
        {error ? (
          <p className="text-sm text-red-600 dark:text-red-400 px-2 py-2">{error}</p>
        ) : isLoading ? (
          <div
            style={{ minHeight: `${textBlockMaxHeight}px` }}
            className="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm"
          >
            Extracting text…
          </div>
        ) : (
          <ExtractedTextBlock text={text} maxHeight={textBlockMaxHeight} />
        )}
      </div>
    </div>
  );
};
