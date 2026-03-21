"use client";

import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import type { Highlight } from "@/types/analysis";
import { setSelectedHighlight } from "@/redux/slices/document/documentContent.slice";
import { setActiveTab } from "@/redux/slices/dashboard/analysispanel.slice";
import DocumentContentUtilityTab from "@/components/doc/DocumentContentUtilityTab";
import { RenderTextContent } from "@/components/doc/docContent/RenderTextContent";
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

  const handleHighlightClick = (highlight: Highlight) => {
    dispatch(setSelectedHighlight(highlight));
    dispatch(setActiveTab("details"));
    onHighlightClick?.(highlight);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl h-full max-h-full borkder borsder-green-700 overflow-scroll border shasdow-sm "
    >
      <DocumentContentUtilityTab docData={docData} docId={docId} documentName={documentName} />
      <RenderTextContent
        documentText={documentText}
        highlights={highlights}
        onHighlightClick={handleHighlightClick}
      />
    </motion.div>
  );
};

export default DocumentContent;
