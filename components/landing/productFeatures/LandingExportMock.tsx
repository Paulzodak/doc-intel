"use client";

import clsx from "clsx";
import { useState } from "react";
import { DownloadIcon } from "@/assets/svg/DownloadIcon";
import { DownloadIconFilled } from "@/assets/svg/DownloadIconFilled";
import { landingExportDemo } from "./config";
import { MacWindowDots } from "./MacWindowDots";

export function LandingExportMock() {
  const [format, setFormat] = useState<"pdf" | "png">("pdf");

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[inherit] text-left">
      <header className="shrink-0 border-b border-white/15 px-2.5 py-2 sm:px-3 sm:py-2.5">
        <MacWindowDots className="flex items-center gap-1 sm:gap-1.5" />
        <div className="mt-2 flex items-center gap-1.5 sm:mt-3 sm:gap-2">
          <DownloadIcon size={15} />
          <span className="text-[10px] font-semibold text-gray-800 sm:text-[11px]">
            {landingExportDemo.exportTriggerLabel}
          </span>
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto bg-white/90 p-2.5 shadow-inner ring-1 ring-black/5 sm:p-3">
        <p className="text-center font-brockmann text-xs font-bold text-gray-800 sm:text-sm">
          {landingExportDemo.documentName}
        </p>
        <div className="mt-2 max-h-32 overflow-hidden rounded-lg border border-gray-200 bg-white p-2 text-[10px] leading-relaxed text-gray-700 shadow-sm sm:mt-3 sm:max-h-36 sm:rounded-xl sm:p-3 sm:text-[11px]">
          {landingExportDemo.previewBefore}
          <span className="rounded bg-amber-100/90 px-0.5 font-medium text-amber-900">
            {landingExportDemo.previewHighlight}
          </span>
          {landingExportDemo.previewAfter}
          <span className="rounded bg-red-100/90 px-0.5 font-medium text-red-900">
            {landingExportDemo.previewRisk}
          </span>
          {landingExportDemo.previewAfterRisk}
        </div>
        <div className="mt-3 border-t border-gray-100 pt-2 sm:mt-4 sm:pt-3">
          <div className="mx-auto flex w-fit items-center gap-0.5 rounded-full bg-gray-100 p-0.5 sm:gap-1 sm:p-1">
            {(["pdf", "png"] as const).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setFormat(id)}
                className={clsx(
                  "relative rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors sm:px-3 sm:py-1.5 sm:text-[11px]",
                  format === id ? "text-white" : "text-gray-600 hover:text-gray-800",
                )}
              >
                {format === id && (
                  <span className="absolute inset-0 rounded-full bg-green-700 shadow-sm" aria-hidden />
                )}
                <span className="relative z-10">
                  {id === "pdf" ? landingExportDemo.formatPdf : landingExportDemo.formatPng}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-col items-center gap-0.5 sm:mt-4 sm:gap-1">
            <span className="flex size-10 items-center justify-center rounded-full bg-green-700 shadow-lg shadow-green-950/20 sm:size-12">
              <DownloadIconFilled size={18} color="white" />
            </span>
            <span className="text-[10px] font-medium text-gray-600 sm:text-[11px]">
              {landingExportDemo.downloadLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
