"use client";

import type { FC } from "react";
import { useSelector } from "react-redux";
import { selectExportFormat } from "@/redux/slices/document/documentAnalysis.slice";
import { DownloadIconFilled } from "@/assets/svg/DownloadIconFilled";
import { SelectExporFormat } from "./SelectExporFormat";
import { useRenderHighlightedHtml } from "./docContent/useRenderHighlightedHtml";
import { Document } from "@/types/document";
import { useGeneratePdfFromPage } from "@/data/document";
import { SpinnerLoader } from "../ui/SpinnerLoader";

interface DownloadButtonProps {
  htmlRenderText: string;
}

export const DownloadButton: FC<DownloadButtonProps> = ({ htmlRenderText }) => {
  const { mutate: generatePdf, isPending } = useGeneratePdfFromPage();
  const exportFormat = useSelector(selectExportFormat);

  const handleExport = () => {
    console.log("htmlRenderText", htmlRenderText);
    generatePdf(
      { html: htmlRenderText || "", output: exportFormat as "pdf" | "png" },
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
    <div className="border-t border-gray-100 bg-gray-50 text-xs text-gray-500 p-4 sm:p-6 sm:px-8">
      <div className="flex items-center justify-center gap-2">
        <SelectExporFormat />
      </div>
      <div className="flex items-center justify-center gap-2">
        <button type="button" onClick={handleExport} className="flex flex-col items-center gap-2">
          <span className="flex flex-col justify-center items-center gap-2 bg-green-700 borders w-14 h-14 rounded-full mx-auto mb-2 shadow-xl shadow-green-950/20">
            {isPending ? (
              <SpinnerLoader size="md" color="white" />
            ) : (
              <DownloadIconFilled size={20} color="white" />
            )}
          </span>
          <span>Download </span>
        </button>
      </div>
    </div>
  );
};
