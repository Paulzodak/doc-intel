"use client";

import { useCallback, useState } from "react";
import { Copy } from "lucide-react";
import { ShareIcon } from "@/assets/svg/ShareIcon";
import { CloseIcon } from "@/assets/svg/CloseIcon";
import { landingShareAccessPeople, landingShareDemo } from "./config";
import { MacWindowDots } from "./MacWindowDots";

function FakeQrGrid() {
  const pattern = [
    "11111101",
    "10000101",
    "10111001",
    "10100001",
    "10111001",
    "10000101",
    "11111101",
    "01010101",
  ];
  return (
    <div
      className="grid gap-0.5 p-2 sm:p-3"
      style={{ gridTemplateColumns: `repeat(${pattern[0]?.length ?? 8}, minmax(0, 1fr))` }}
      aria-hidden
    >
      {pattern.flatMap((row, ri) =>
        row.split("").map((cell, ci) => (
          <span
            key={`${ri}-${ci}`}
            className={`aspect-square rounded-[1px] ${cell === "1" ? "bg-gray-800" : "bg-gray-100"}`}
          />
        )),
      )}
    </div>
  );
}

export function LandingShareMock() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[inherit] bg-white/98 text-left shadow-inner ring-1 ring-black/5">
      <header className="flex shrink-0 items-center justify-between border-b border-gray-100 px-2.5 py-2 sm:px-3 sm:py-2.5">
        <MacWindowDots className="flex shrink-0 items-center gap-1 sm:gap-1.5" />
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          <ShareIcon size={17} color="#374151" />
          <h3 className="truncate text-xs font-lora font-medium text-gray-900 sm:text-sm">{landingShareDemo.modalTitle}</h3>
        </div>
        <span className="rounded-lg p-0.5 text-gray-400 sm:p-1" aria-hidden>
          <CloseIcon size={15} color="#9ca3af" />
        </span>
      </header>
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-2.5 sm:space-y-3 sm:p-3">
        <p className="truncate text-[10px] text-gray-500 sm:text-xs" title={landingShareDemo.documentName}>
          {landingShareDemo.documentName}
        </p>
        <div>
          <label className="mb-0.5 block text-[9px] font-medium text-gray-500 sm:mb-1 sm:text-[10px]">
            {landingShareDemo.linkLabel}
          </label>
          <div className="flex gap-1 sm:gap-1.5">
            <input
              type="text"
              readOnly
              value={landingShareDemo.linkDisplay}
              className="min-w-0 flex-1 rounded-md border border-gray-200 bg-gray-50 px-1.5 py-1 text-[10px] text-gray-700 sm:rounded-lg sm:px-2 sm:py-1.5 sm:text-[11px]"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="flex shrink-0 items-center gap-0.5 rounded-md bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-700 hover:bg-gray-200 sm:gap-1 sm:rounded-lg sm:px-2.5 sm:py-1.5 sm:text-[11px]"
            >
              <Copy size={12} />
              {copied ? landingShareDemo.copiedLabel : landingShareDemo.copyLabel}
            </button>
          </div>
        </div>
        <div>
          <label className="mb-0.5 block text-[9px] font-medium text-gray-500 sm:mb-1 sm:text-[10px]">
            {landingShareDemo.qrLabel}
          </label>
          <div className="flex justify-center rounded-md border border-gray-100 bg-gray-50 p-1.5 sm:rounded-lg sm:p-2">
            <div className="w-[88px] overflow-hidden rounded border border-gray-200 bg-white sm:w-[104px] sm:rounded-md">
              <FakeQrGrid />
            </div>
          </div>
          <p className="mt-0.5 text-center text-[9px] text-gray-400 sm:mt-1 sm:text-[10px]">{landingShareDemo.qrHint}</p>
        </div>
        <div>
          <label className="mb-0.5 block text-[9px] font-medium text-gray-500 sm:mb-1 sm:text-[10px]">
            {landingShareDemo.peopleLabel}
          </label>
          <div className="mb-1.5 flex flex-wrap gap-1 sm:mb-2 sm:gap-1.5">
            {landingShareAccessPeople.map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-0.5 rounded-full border border-input bg-muted/50 px-1.5 py-0.5 text-[9px] text-gray-600 sm:gap-1 sm:px-2 sm:text-[10px]"
              >
                <span className="max-w-[88px] truncate sm:max-w-[100px]">{name}</span>
                <CloseIcon size={10} color="#6b7280" />
              </span>
            ))}
          </div>
          <p className="text-[9px] text-muted-foreground sm:text-[10px]">{landingShareDemo.peopleHint}</p>
        </div>
        <button
          type="button"
          className="w-full rounded-full bg-green-600 py-2 text-xs font-medium text-white hover:opacity-90 sm:py-2.5 sm:text-sm"
        >
          {landingShareDemo.saveLabel}
        </button>
      </div>
    </div>
  );
}
