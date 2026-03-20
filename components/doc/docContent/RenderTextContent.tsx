"use client";

import React, { useCallback, useMemo } from "react";
import type { Highlight } from "@/types/analysis";
import {
  HIGHLIGHT_INDEX_ATTR,
  useRenderHighlightedHtml,
} from "@/components/doc/docContent/useRenderHighlightedHtml";

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

  const handleContainerClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!onHighlightClick) return;
      const target = e.target as HTMLElement;
      const highlightEl = target.closest(`[${HIGHLIGHT_INDEX_ATTR}]`);
      if (!highlightEl) return;
      const index = highlightEl.getAttribute(HIGHLIGHT_INDEX_ATTR);
      if (index == null) return;
      const i = parseInt(index, 10);
      if (Number.isNaN(i) || i < 0 || i >= sortedHighlights.length) return;
      onHighlightClick(sortedHighlights[i]);
    },
    [onHighlightClick, sortedHighlights],
  );

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      selection.toString().trim();
    }
  };

  const htmlRenderText = useRenderHighlightedHtml(documentText, sortedHighlights);

  return (
    <div
      id="prose"
      className="prose max-w-none border-gray-200 select-text text-[14px] md:text-[14px]  font-jakarta py-4 px-4 sm:px-8 leading-[2px]"
      onMouseUp={handleTextSelection}
      onClick={handleContainerClick}
      dangerouslySetInnerHTML={{ __html: htmlRenderText }}
      // style={{ backgroundColor: "blue" }}
    >
      {/* {renderHighlightedText()} */}
    </div>
  );
};
