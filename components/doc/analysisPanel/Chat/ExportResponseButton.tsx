"use client";

import ReactDOMServer from "react-dom/server";
import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGeneratePdf, useGeneratePdfFromPage } from "@/data/document";
import { DownloadIcon } from "@/assets/svg/DownloadIcon";
import { Document } from "@/types/document";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
import { DownloadIconFilled } from "@/assets/svg/DownloadIconFilled";
import { SelectExporFormat } from "../../SelectExporFormat";
interface ExportResponseButtonProps {
  text?: string;
  docData?: Document;
  className?: string;
}

export const ExportResponseButton: React.FC<ExportResponseButtonProps> = ({
  docData,
  text,
  className,
}) => {
  const { mutate: generatePdf } = useGeneratePdfFromPage();
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const handleExport = () => {
    // console.log("htmlRenderText", htmlRenderText);
    // const html = `<div style="white-space: pre-wrap;">${text}</div>`;
    const logoHtml = ReactDOMServer.renderToStaticMarkup(<QlaretyLogo size={30} />);
    const html = `<!doctype html>
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
  <p class="text-sm whitespace-pre-wrap">${text}</p>
  </div>
  </body>
</html>`;
    generatePdf(
      { html: html },
      {
        onSuccess: (response) => {
          const blob = response.data;
          const contentDisposition = response.headers?.["content-disposition"];
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
    // const node = document.querySelector(".my-node");
    // if (!node || !(node instanceof HTMLElement)) return;
    // toBlob(node)
    //   .then((blob) => {
    //     if (!blob) return;
    //     const url = URL.createObjectURL(blob);
    //     const a = document.createElement("a");
    //     a.href = url;
    //     a.download = "document.png";
    //     a.click();
    //     URL.revokeObjectURL(url);
    //   })
    //   .catch((err) => console.error("Export failed:", err));
  };

  return (
    <div ref={ref} className={clsx("relative flex items-center", className)}>
      <button
        type="button"
        // onClick={handleExport}
        onClick={() => setShowDropdown((v) => !v)}
        className="my-auto"
        // className=" flex bg-neutral-50 border text-sm border-gray-200 gap-2 text-gray-500 items-center px-2 py-1 rounded-full hover:bg-gray-50 transition-colors"
      >
        <DownloadIcon size={16} color="#6a7282" />
      </button>
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
                >
                  {/* <DownloadIcon size={20} /> */}
                  {/* <span className="text-center mx-auto font-bold font-brockmann text-lg sm:text-xl">
                    name
                  </span> */}
                </div>
                <div className="max-h-[300px] relative overflow-hidden border border-gray-200 rounded-2xl mt-4 shadow">
                  {/* {text} */}
                  <p className="text-sm whitespace-pre-wrap">{text}</p>
                  {/* <RenderTextContent
                    documentText={docData.inputText}
                    highlights={docData.result?.analyzeChunkResults?.flatMap(
                      (chunk) => chunk.highlights || [],
                    )}
                    onHighlightClick={() => {}}
                  /> */}
                  <div className="absolute z-0 w-full h-full todp-[50%] top-0 bg-linear-to-b from-white/10 from-10%  to-white opacity-80  " />
                  <div className="absolute bottom-0 right-0 flex items-end flex-col p-2 backdrop-brightness-150 m-[4px]">
                    <QlaretyLogo size={50} className="msx-auto" />
                    <span className="text-sm text-black font-medium">Qlarety</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 bg-gray-50  text-xs text-gray-500 p-4 sm:p-6 sm:px-8">
                <SelectExporFormat />
                <div className="flex items-center justify-center gap-2">
                  <button onClick={handleExport} className="">
                    <button className="flex flex-col items-center gap-2 bg-green-700 borders p-5 rounded-full mx-auto mb-2 shadow-xl shadow-green-950/20">
                      <DownloadIconFilled size={20} color="white" />
                    </button>
                    <span className="">Download PDF</span>
                  </button>
                  {/* <div className="">
                    <button className="flex flex-col items-center gap-2 bg-green-700 borders p-5 rounded-full mx-auto mb-2 shadow-xl shadow-green-950/20">
                      <GalleryIconFilled size={20} color="white" />
                    </button>
                    <span className="">Export as image</span>
                  </div>
                  <div className="">
                    <button className="flex flex-col items-center gap-2 bg-green-700 borders p-5 rounded-full mx-auto mb-2 shadow-xl shadow-green-950/20">
                      <GalleryIconFilled size={20} color="white" />
                    </button>
                    <span className="">Export as image</span>
                  </div> */}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
