"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import type { Highlight } from "@/types/analysis";

interface RenderTextContentProps {
  documentText: string;
  highlights: Highlight[];
  onHighlightClick?: (highlight: Highlight) => void;
}

export const RenderTextContent: React.FC<RenderTextContentProps> = ({
  documentText,
  highlights,
  onHighlightClick,
}) => {
  const sortedHighlights = useMemo(() => {
    return [...highlights].sort((a, b) => a.start - b.start);
  }, [highlights]);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const selectedText = selection.toString().trim();
      console.log("Selected text:", selectedText);
    }
  };

  const renderHighlightedText = () => {
    if (sortedHighlights.length === 0) {
      return <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{documentText}</p>;
    }

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    sortedHighlights.forEach((highlight, index) => {
      if (highlight.start > lastIndex) {
        parts.push(
          <span key={`text-${index}`} className="text-gray-800">
            {documentText.substring(lastIndex, highlight.start)}
          </span>,
        );
      }

      const highlightClass = {
        risk: "bg-red-100 text-red-900 border-b-2 border-red-400 cursor-pointer hover:bg-red-200 transition-colors",
        advantage:
          "bg-green-100 text-green-900 border-b-2 border-green-400 cursor-pointer hover:bg-green-200 transition-colors",
        compliance:
          "bg-yellow-100 text-yellow-900 border-b-2 border-yellow-400 cursor-pointer hover:bg-yellow-200 transition-colors",
      }[highlight.type];

      parts.push(
        <motion.span
          key={`highlight-${index}`}
          className={highlightClass}
          onClick={() => onHighlightClick?.(highlight)}
          title={highlight.description || highlight.text}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {highlight.text}
        </motion.span>,
      );

      lastIndex = highlight.end;
    });

    if (lastIndex < documentText.length) {
      parts.push(
        <span key="text-end" className="text-gray-800">
          {documentText.substring(lastIndex)}
        </span>,
      );
    }

    return <p className="whitespace-pre-wrap leading-relaxed">{parts}</p>;
  };

  return (
    <div
      id="prose"
      className=" prose max-w-none border-gray-200 select-text text-[14px] md:text-[14px] font-jakarta py-4 px-4 sm:px-8"
      onMouseUp={handleTextSelection}
    >
      {renderHighlightedText()}
    </div>
  );
};
