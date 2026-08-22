"use client";

import { useMemo } from "react";
import ReactDOMServer from "react-dom/server";
import type { Highlight } from "@/types/analysis";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";

const HIGHLIGHT_CLASSES: Record<string, string> = {
  risk: "bg-red-100 text-red-900 border-b-2 border-red-400 cursor-pointer hover:bg-red-200 transition-colors",
  advantage:
    "bg-green-100 text-green-900 border-b-2 border-green-400 cursor-pointer hover:bg-green-200 transition-colors",
  compliance:
    "bg-yellow-100 text-yellow-900 border-b-2 border-yellow-400 cursor-pointer hover:bg-yellow-200 transition-colors",
};

const HIGHLIGHT_STYLE: Record<string, React.CSSProperties> = {
  risk: { backgroundColor: "#ffe2e2", color: " #82181a" },
  advantage: { backgroundColor: "#dcfce7", color: "#0d542b" },
  compliance: { color: "#733e0a", backgroundColor: "#fef9c2" },
};

export const HIGHLIGHT_INDEX_ATTR = "data-highlight-index";

export function useRenderHighlightedHtml(
  documentText: string,
  sortedHighlights: Highlight[],
): string {
  const logoHtml = ReactDOMServer.renderToStaticMarkup(<QlaretyLogo size={30} />);
  return useMemo(() => {
    const wrapAsHtmlDocument = (content: string) => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }

      p {
        margin: 0;
        white-space: pre-wrap;
        line-height: 1.6;
      }

      [${HIGHLIGHT_INDEX_ATTR}] {
        border-bottom: 2px solid transparent;
        cursor: pointer;
      }
      .export-brand {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      

      
    }
      .export-container {
        padding: 10px;
        background-color: white;
      }
    </style>
  </head>
  <body>
  <div class="export-container">
  <div class="export-brand">
  ${logoHtml}
  </div>
  ${content}
  </div>
  </body>
</html>`;

    if (sortedHighlights.length === 0) {
      const content = ReactDOMServer.renderToStaticMarkup(
        <p
          dangerouslySetInnerHTML={{ __html: documentText }}
          className="text-gray-800 whitespace-pre-wrap leading-relaxed"
        />,
      );
      return wrapAsHtmlDocument(content);
    }

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    sortedHighlights.forEach((highlight, index) => {
      if (highlight.start > lastIndex) {
        const segment = documentText.substring(lastIndex, highlight.start);
        parts.push(
          <span key={`text-${index}`} className="" dangerouslySetInnerHTML={{ __html: segment }} />,
        );
      }

      const highlightClass = HIGHLIGHT_CLASSES[highlight.type] ?? "";

      parts.push(
        <span
          key={`highlight-${index}`}
          className={highlightClass}
          title={highlight.description || highlight.text}
          {...{ [HIGHLIGHT_INDEX_ATTR]: String(index) }}
          style={HIGHLIGHT_STYLE[highlight.type]}
        >
          {highlight.text}
        </span>,
      );

      lastIndex = highlight.end;
    });

    if (lastIndex < documentText.length) {
      const segment = documentText.substring(lastIndex);
      parts.push(
        <span
          key="text-end"
          className="text-gray-800"
          dangerouslySetInnerHTML={{ __html: segment }}
        />,
      );
    }

    const content = ReactDOMServer.renderToStaticMarkup(
      <p className="whitespace-pre-wrap leading-relaxed text-gray-800 ">{parts}</p>,
    );
    return wrapAsHtmlDocument(content);
  }, [documentText, sortedHighlights]);
}
