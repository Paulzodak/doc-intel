"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import type { Highlight } from "@/types/analysis";
import { setSelectedHighlight } from "@/redux/slices/document/documentContent.slice";
import { setActiveTab } from "@/redux/slices/dashboard/analysispanel.slice";
import DocumentContentUtilityTab from "@/components/doc/DocumentContentUtilityTab";
import { Document } from "@/types/document";

interface DocumentContentProps {
  docId: string;
  documentName: string;
  documentText: string;
  highlights: Highlight[];
  onHighlightClick?: (highlight: Highlight) => void;
  docData: Document;
}

const DocumentContent: React.FC<DocumentContentProps> = ({
  docId,
  documentName,
  documentText,
  highlights,
  onHighlightClick,
  docData,
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
          </span>,
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
        </motion.span>,
      );

      lastIndex = highlight.end;
    });

    // Add remaining text
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl overflow-hidden border shasdow-sm relative"
    >
      <DocumentContentUtilityTab docData={docData} docId={docId} documentName={documentName} />
      <div
        className="prose max-w-none border-gray-200 select-text text-[14px] md:text-[16px] font-jakarta py-4 px-4 sm:px-8"
        onMouseUp={handleTextSelection}
      >
        {renderHighlightedText()}
      </div>
    </motion.div>
  );
};

export default DocumentContent;
