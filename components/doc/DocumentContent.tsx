"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import type { Highlight } from "@/types/analysis";
import { setSelectedHighlight } from "@/redux/slices/document/documentContent.slice";
import { setActiveTab } from "@/redux/slices/dashboard/analysispanel.slice";
import { Check, Copy } from "lucide-react";
import { ShareIcon } from "@/assets/svg/ShareIcon";
import { DocumentTextIcon } from "@/assets/svg/DocumentTextIcon";
import { MenuIcon2 } from "@/assets/svg/MenuIcon2";
import { CloseIcon } from "@/assets/svg/CloseIcon";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <div className="border-b-[1px] py-4 font-jakarta px-4 sm:px-8">
        <div className="flex items-center justify-between  font-jakarta ">
          <div className="flex gap-2 items-center">
            <DocumentTextIcon size={20} className="" color="#6a7282" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 font-jakarta">Document</h2>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-2 text-[10px] sm:text-xs leading-5 hidden sm:flex">
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full">Risks</span>
              <span className="px-2 py-1 bg-green-100 text-primary-blue-dark rounded-full bg-lidnear-to-b frdom-[#124F35] to-[d#1D734B]">
                Advantages
              </span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                Compliance
              </span>
              <div className="border-l-[1px] border-gray-200 my-1" />
              <div className="gap-2 hidden md:flex">
                <div
                  // onClick={handleCopy}
                  className="flex border text-sm border-gray-200 gap-2 text-gray-500 items-center px-2  py-1 rounded-full"
                >
                  <Copy size={15} className="" />
                  <span>Copy</span>
                </div>
                <div
                  // onClick={handleCopy}
                  className="flex border text-sm border-gray-200 gap-2 text-gray-500 items-center px-2  py-1 rounded-full"
                >
                  <ShareIcon size={15} className="" color="#6a7282" />
                  <span>Share</span>
                </div>
              </div>
            </div>
            <MobileMenu />
          </div>
        </div>
        <div className="flex gap-2 mt-2 ">
          <div className="flex gap-2 text-[10px] sm:text-xs leading-5 hidden sm:flex">
            <div className="gap-2 hidden md:flex">
              <div
                // onClick={handleCopy}
                className="flex border text-sm border-gray-200 gap-2 text-gray-500 items-center px-2  py-1 rounded-full"
              >
                <Copy size={15} className="" />
                <span>Public</span>
              </div>
              <div
                // onClick={handleCopy}
                className="flex border text-sm border-gray-200 gap-2 text-gray-500 items-center px-2  py-1 rounded-full"
              >
                <ShareIcon size={15} className="" color="#6a7282" />
                <span>Share</span>
              </div>
            </div>
          </div>
          <MobileMenu />
        </div>
      </div>
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

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center justify-center">
      <MenuIcon2 onClick={toggleMobileMenu} className="my-auto" color="#6a7282" />
      {isOpen && (
        <motion.div className="absolute left-0 top-14 w-full h-40 bg-white shadow-2xl border rounded-2xl z-10 md:hidden">
          <CloseIcon
            onClick={toggleMobileMenu}
            className="absolute top-4 right-4 cursor-pointer "
            color="#6a7282"
            size={15}
          />
        </motion.div>
      )}
    </div>
  );
};
