"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import type { Highlight } from "@/types/analysis";
import { setSelectedHighlight } from "@/redux/slices/document/documentContent.slice";
import { setActiveTab } from "@/redux/slices/dashboard/analysispanel.slice";

interface DocumentContentProps {
  documentText: string;
  highlights: Highlight[];
  onHighlightClick?: (highlight: Highlight) => void;
}

const DocumentContent: React.FC<DocumentContentProps> = ({
  documentText,
  highlights,
  onHighlightClick,
}) => {
  const dispatch = useDispatch();

  // Sort highlights by start position
  const sortedHighlights = useMemo(() => {
    return [...highlights].sort((a, b) => a.start - b.start);
  }, [highlights]);

  const handleHighlightClick = (highlight: Highlight) => {
    dispatch(setSelectedHighlight(highlight));
    dispatch(setActiveTab("details"));
    onHighlightClick?.(highlight);
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const selectedText = selection.toString().trim();
      console.log("Selected text:", selectedText);
    }
  };

  // Render text with highlights
  const renderHighlightedText = () => {
    if (sortedHighlights.length === 0) {
      return <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{documentText}</p>;
    }

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    sortedHighlights.forEach((highlight, index) => {
      // Add text before highlight
      if (highlight.start > lastIndex) {
        parts.push(
          <span key={`text-${index}`} className="text-gray-800">
            {documentText.substring(lastIndex, highlight.start)}
          </span>
        );
      }

      // Add highlighted text
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
          onClick={() => handleHighlightClick(highlight)}
          title={highlight.description || highlight.text}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {highlight.text}
        </motion.span>
      );

      lastIndex = highlight.end;
    });

    // Add remaining text
    if (lastIndex < documentText.length) {
      parts.push(
        <span key="text-end" className="text-gray-800">
          {documentText.substring(lastIndex)}
        </span>
      );
    }

    return <p className="whitespace-pre-wrap leading-relaxed">{parts}</p>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-200/50 shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Document Text</h2>
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 bg-red-100 text-red-700 rounded">Risks</span>
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Advantages</span>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Compliance</span>
        </div>
      </div>
      <div
        className="prose max-w-none border-t border-gray-200 pt-6 select-text"
        onMouseUp={handleTextSelection}
      >
        {renderHighlightedText()}
      </div>
    </motion.div>
  );
};

export default DocumentContent;
