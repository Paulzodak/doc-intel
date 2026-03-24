"use client";

import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGeneratePdf, useGeneratePdfFromPage } from "@/data/document";
import { DownloadIcon } from "@/assets/svg/DownloadIcon";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
import { DownloadIconFilled } from "@/assets/svg/DownloadIconFilled";
import { Highlight } from "@/types/analysis";
import { RenderHighlightDetails } from "./RenderHightlightDetail";
import ReactDOMServer from "react-dom/server";
import { setExportFormat } from "@/redux/slices/document/documentAnalysis.slice";
import { SelectExporFormat } from "../../SelectExporFormat";
import { DownloadButton } from "../../DownloadButton";

interface ExportDetailButtonProps {
  highlightData?: Highlight;
  className?: string;
}

export const ExportDetailButton: React.FC<ExportDetailButtonProps> = ({
  highlightData,
  className,
}) => {
  const { mutate: generatePdf } = useGeneratePdfFromPage();
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedOutsideTrigger = ref.current && !ref.current.contains(target);
      const clickedOutsideModal = modalRef.current && !modalRef.current.contains(target);
      if (clickedOutsideTrigger && clickedOutsideModal) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  if (!highlightData) return;

  const highlightHtml = ReactDOMServer.renderToStaticMarkup(
    <RenderHighlightDetails highlightData={highlightData} />,
  );
  const logoHtml = ReactDOMServer.renderToStaticMarkup(<QlaretyLogo size={30} />);

  // Standalone HTML for the PDF renderer:
  // - Includes required CSS inside <head>
  // - Mirrors the modal layout (container + overlay + bottom-right brand)
  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol";
      background: white;
    }

    .export-container {
      margin :10px;
      position: relative;
      overflow: hidden;
      border: 1px solid #e5e7eb; /* gray-200 */
      border-radius: 16px; /* rounded-2xl */
      margin-top: 16px; /* mt-4 */
      box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    }


    .export-content {
      position: relative;
      z-index: 1;
      padding: 0px 16px; /* p-4 */
    }

      .export-brand {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 8px;
    }

    /* Minimal subset of Tailwind classes used by RenderHighlightDetails */
      .export-container .space-y-3 { display: flex; flex-direction: column; gap: 12px; }
      .export-container .text-xs { font-size: 12px; }
      .export-container .text-sm { font-size: 14px; }
      .export-container .font-semibold { font-weight: 600; }
      .export-container .font-medium { font-weight: 500; }
      .export-container .uppercase { text-transform: uppercase; }
      .export-container .capitalize { text-transform: capitalize; }
      .export-container .mt-1 { margin-top: 4px; }
      .export-container .bg-gray-50 { background: #f9fafb; }
      .export-container .p-2 { padding: 8px; }
      .export-container .rounded { border-radius: 8px; }
      .export-container .text-gray-500 { color: #6b7280; }
      .export-container .text-gray-700 { color: #374151; }
  </style>
</head>
<body>
  <div class="export-container">
  <div class="export-brand">
    ${logoHtml}
  </div>
    <div class="export-content">
      ${highlightHtml}
    </div>
    
  </div>
</body>
</html>`;
  const handleExport = () => {
    generatePdf(
      { html: html, output: "png", scale: 20 },
      {
        onSuccess: (response) => {
          console.log(response.headers);
          const blob = response.data;
          const contentDisposition = response.headers?.["content-disposition"];
          console.log(contentDisposition);
          const filenameMatch = /filename="?([^"]+)"?/i.exec(contentDisposition || "");
          const filename = filenameMatch?.[1] || "document.pdf";

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        },
      },
    );
  };

  return (
    <div ref={ref} className={clsx("relative flex items-center", className)}>
      <button type="button" onClick={() => setShowDropdown((v) => !v)} className="my-auto">
        <DownloadIcon size={16} color="#6a7282" />
      </button>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                key="export-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-10 flex items-center justify-center p-4"
                onClick={() => setShowDropdown(false)}
              >
                <div className="absolute inset-0 bg-black/50" aria-hidden />
                <motion.div
                  ref={modalRef}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="relative w-full max-w-[500px] bg-white border border-gray-200 rounded-4xl shadow-xl shadow-black/20 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-1 p-4 sm:p-6 sm:px-8">
                    <div
                      onClick={handleExport}
                      className="w-full flex items-center gap-2  text-left  text-gray-700 hover:bg-gray-50 disabled:opacity-70 disabled:pointer-events-none"
                    ></div>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                    {/* <div className="max-h-[300px] relative overflow-hidden border border-gray-200 rounded-2xl mt-4 shadow">
                      {highlightData && (
                        <RenderHighlightDetails highlightData={highlightData} className="p-4" />
                      )}
                      <div className="absolute z-0 w-full h-full todp-[50%] top-0 bg-linear-to-b from-white/10 from-10%  to-white opacity-80  " />
                      <div className="absolute bottom-0 right-0 flex items-end flex-col p-2 backdrop-brightness-150 m-[4px]">
                        <QlaretyLogo size={50} className="msx-auto" />
                        <span className="text-sm text-black font-medium">Qlarety</span>
                      </div>
                    </div> */}
                  </div>
                  <DownloadButton htmlRenderText={html} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
};
