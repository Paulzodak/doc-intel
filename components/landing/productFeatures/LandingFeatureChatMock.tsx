"use client";

import { WandIcon } from "@/assets/svg/WandIcon";
import { BsStars } from "react-icons/bs";
import { landingChatDemo } from "./config";
import { MacWindowDots } from "./MacWindowDots";

export function LandingFeatureChatMock() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[inherit] text-left">
      <header className="border-b border-white/15 px-3 py-2 sm:px-4 sm:py-3">
        <MacWindowDots className="flex shrink-0 items-center gap-1 sm:gap-1.5" />
        <div className="mt-2 flex items-center gap-2 sm:mt-3 sm:gap-3">
          <span className="flex size-8 items-center justify-center rounded-lg border bg-white/12 ring-1 ring-white/10 sm:size-9 sm:rounded-xl">
            <WandIcon size={18} color="#121714" className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-lora font-medium tracking-tight text-gray-800 sm:text-sm">
              {landingChatDemo.title}
            </p>
            <p className="truncate text-[10px] font-medium text-gray-500 sm:text-[11px]">
              {landingChatDemo.documentName}
            </p>
          </div>
        </div>
      </header>
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-2.5 py-2 sm:space-y-3 sm:px-3 sm:py-3">
        <div className="flex justify-end">
          <p className="max-w-[92%] rounded-xl rounded-br-md border border-white bg-white/40 px-2.5 py-1.5 text-[11px] leading-snug text-gray-600 shadow-sm ring-1 ring-white/15 backdrop-blur-sm sm:rounded-2xl sm:px-3 sm:py-2 sm:text-[12px]">
            {landingChatDemo.userMessage}
          </p>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[95%] rounded-xl rounded-bl-md bg-black/28 px-2.5 py-1.5 text-[11px] leading-snug text-white/92 ring-1 ring-white/10 backdrop-blur-sm sm:rounded-2xl sm:px-3 sm:py-2 sm:text-[12px]">
            <p>
              {landingChatDemo.assistantLeadIn}
              <span className="font-semibold text-white">{landingChatDemo.assistantEmphasis}</span>
              {landingChatDemo.assistantRest}
              <BsStars className="ml-1 inline" />
            </p>
          </div>
        </div>
      </div>
      <footer className="shrink-0 border-t border-white/15 p-2 sm:p-3">
        <div
          className="flex items-center gap-1.5 rounded-lg bg-black/22 px-2.5 py-2 ring-1 ring-white/10 sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2.5"
          aria-hidden
        >
          <span className="flex-1 text-[10px] text-white/38 sm:text-[12px]">
            {landingChatDemo.composerPlaceholder}
          </span>
          <span className="shrink-0 rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-gray-600 sm:rounded-lg sm:px-2.5 sm:py-1 sm:text-[11px]">
            {landingChatDemo.sendLabel}
          </span>
        </div>
      </footer>
    </div>
  );
}
