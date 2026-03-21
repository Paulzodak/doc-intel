"use client";

import ReactDOMServer from "react-dom/server";
import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LockIcon } from "@/assets/svg/LockIcon";
import { CheckIcon } from "@/assets/svg/CheckIcon";
import { useGeneratePdf, useUpdateDocument } from "@/data/document";
import { DownloadIcon } from "@/assets/svg/DownloadIcon";
import { toBlob } from "html-to-image";
import { Document } from "@/types/document";
import { GalleryIcon } from "@/assets/svg/GalleryIcon";
import { GalleryIconFilled } from "@/assets/svg/GalleryIconFilled";
import DocumentContent from "./DocumentContent";
import { RenderTextContent } from "./docContent/RenderTextContent";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
import { DownloadIconFilled } from "@/assets/svg/DownloadIconFilled";
import { useRenderHighlightedHtml } from "./docContent/useRenderHighlightedHtml";
import { useDispatch, useSelector } from "react-redux";
import {
  selectExportFormat,
  setExportFormat,
} from "@/redux/slices/document/documentAnalysis.slice";
import { SelectExporFormat } from "./SelectExporFormat";
export type VisibilityOption = 1 | 2 | 3;

const VISIBILITY_OPTIONS: { id: VisibilityOption; label: string; description: string }[] = [
  { id: 1, label: "Public", description: "Document is visible to everyone." },
  {
    id: 2,
    label: "Selected Users with the link",
    description: "Only selected users with the link can view this document.",
  },
  { id: 3, label: "Me only", description: "Only you can view this document." },
];

interface ExportButtonProps {
  /** Document ID for saving visibility (required for Save to work). */
  documentId?: string;
  /** Initial visibility. Defaults to "public". */
  value?: VisibilityOption;
  /** Called when user selects a new option. */
  onChange?: (value: VisibilityOption) => void;
  className?: string;
  docData: Document;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  documentId,
  docData,
  value: controlledValue,
  onChange,
  className,
}) => {
  const dispatch = useDispatch();
  const { mutate: generatePdf } = useGeneratePdf();
  const [internalValue, setInternalValue] = useState<VisibilityOption>(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const exportFormat = useSelector(selectExportFormat);
  const [savingOptionId, setSavingOptionId] = useState<VisibilityOption | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { mutate } = useUpdateDocument();

  const isControlled = controlledValue !== undefined;
  const visibility = isControlled ? controlledValue : internalValue;

  const setVisibility = (next: VisibilityOption) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    setShowDropdown(false);
  };

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

  const htmlRenderText = useRenderHighlightedHtml(
    docData.inputText,
    docData.result?.analyzeChunkResults?.flatMap((chunk) => chunk.highlights || []),
  );
  const handleExport = (output?: "pdf" | "jpeg" | "png") => {
    console.log("htmlRenderText", htmlRenderText);
    generatePdf(
      { html: htmlRenderText || "", output: output as "pdf" | "png" },
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
    <div ref={ref} className={clsx("", className)}>
      <button
        type="button"
        // onClick={handleExport}
        onClick={() => setShowDropdown((v) => !v)}
        className=" flex bg-neutral-50 border  border-gray-200 gap-2 text-gray-500 items-center px-2 py-1 rounded-full hover:bg-gray-50 transition-colors"
      >
        <DownloadIcon size={15} />
        <span>Export content</span>
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
                  onClick={() => handleExport(exportFormat)}
                  className="w-full flex items-center gap-2  text-left  text-gray-700 hover:bg-gray-50 disabled:opacity-70 disabled:pointer-events-none"
                >
                  {/* <DownloadIcon size={20} /> */}
                  <span className="text-center mx-auto font-bold font-brockmann text-lg sm:text-xl">
                    {docData.documentName}
                  </span>
                </div>
                <div className="max-h-[300px] relative overflow-hidden border border-gray-200 rounded-2xl mt-4 shadow">
                  {/* <RenderTextContent
                    documentText={docData.inputText}
                    highlights={docData.result?.analyzeChunkResults?.flatMap(
                      (chunk) => chunk.highlights || [],
                    )}
                    onHighlightClick={() => {}}
                  /> */}
                  <div dangerouslySetInnerHTML={{ __html: htmlRenderText }} />
                  {/* <div className="absolute z-0 w-full h-full todp-[50%] top-0 bg-linear-to-b from-white/10 from-10%  to-white opacity-80  " />
                  <div className="absolute bottom-0 right-0 flex items-end flex-col p-2 backdrop-brightness-150 m-[4px]">
                    <QlaretyLogo size={50} className="msx-auto" />
                    <span className="text-sm text-black font-medium">Qlarety</span>
                  </div> */}
                </div>
              </div>
              <div className="border-t border-gray-100 bg-gray-50  text-xs text-gray-500 p-4 sm:p-6 sm:px-8">
                <div className="flex items-center justify-center gap-2">
                  <SelectExporFormat />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <button onClick={() => handleExport(exportFormat)} className="">
                    <button className="flex flex-col items-center gap-2 bg-green-700 borders p-5 rounded-full mx-auto mb-2 shadow-xl shadow-green-950/20">
                      <DownloadIconFilled size={20} color="white" />
                    </button>
                    <span className="">Download </span>
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
