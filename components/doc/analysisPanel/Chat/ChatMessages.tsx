"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import type { DocumentChatMessage } from "@/types/document";
import { ThumbsUpIcon } from "@/assets/svg/ThumbsUpIcon";
import { ThumbsDownIcon } from "@/assets/svg/ThumbsDownIcon";
import { ExportResponseButton } from "@/components/doc/analysisPanel/Chat/ExportResponseButton";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
import { ToastLogger } from "@/utils/toastUtils";

export interface ChatMessagesProps {
  chatMessages: DocumentChatMessage[];
  isSending: boolean;
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-end gap-2.5"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#11161f] ring-2 ring-primary-green/30">
        <QlaretyLogo width={22} height={22} shouldNavigate={false} />
      </div>
      <div className="rounded-2xl rounded-bl-md border border-[#1e2939]/8 bg-[#f7f9f8] px-4 py-3 dark:border-white/10 dark:bg-[#161c27]">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-primary-green"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ chatMessages, isSending }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isAtBottomRef = useRef(true);

  const scrollToBottom = () => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const threshold = 24;
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    isAtBottomRef.current = distanceFromBottom <= threshold;
  };

  useEffect(() => {
    if (isAtBottomRef.current) {
      scrollToBottom();
    }
  }, [chatMessages, isSending]);

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      ToastLogger.success("documents", "Copied to clipboard");
    } catch {
      ToastLogger.error("documents", "Could not copy");
    }
  };

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="relative min-h-0 flex-1 overflow-y-auto px-1 sm:px-2"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(71,225,140,0.22) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="relative flex min-h-full flex-col justify-end space-y-4 py-3">
        {chatMessages.map((message) => {
          const isUser = message.role === "user";
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`flex items-end gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}
            >
              {!isUser && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#11161f] ring-2 ring-primary-green/25">
                  <QlaretyLogo width={22} height={22} shouldNavigate={false} />
                </div>
              )}
              <div className={`max-w-[85%] space-y-2 ${isUser ? "items-end" : ""}`}>
                <div
                  className={
                    isUser
                      ? "rounded-2xl rounded-br-md bg-[#11161f] px-4 py-3 text-sm leading-relaxed text-white shadow-lg shadow-[#11161f]/15"
                      : "rounded-2xl rounded-bl-md border border-[#1e2939]/8 bg-[#f7f9f8] px-4 py-3 text-sm leading-relaxed text-[#1e2939] dark:border-white/10 dark:bg-[#161c27] dark:text-gray-100"
                  }
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                {!isUser && (
                  <div className="flex items-center gap-0.5 text-gray-400">
                    <button
                      type="button"
                      onClick={() => copyText(message.content)}
                      className="rounded-lg p-1.5 transition-colors hover:bg-[#11161f]/5 hover:text-[#11161f]"
                      aria-label="Copy"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg p-1.5 transition-colors hover:bg-[#11161f]/5"
                      aria-label="Thumbs up"
                    >
                      <ThumbsUpIcon size={16} color="#6a7282" />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg p-1.5 transition-colors hover:bg-[#11161f]/5"
                      aria-label="Thumbs down"
                    >
                      <ThumbsDownIcon size={16} color="#6a7282" />
                    </button>
                    <span className="rounded-lg p-1.5 transition-colors hover:bg-[#11161f]/5">
                      <ExportResponseButton text={message.content} />
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
        {isSending && <TypingIndicator />}
      </div>
    </div>
  );
};
