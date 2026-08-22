"use client";

import { motion } from "framer-motion";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
import type { SupportMessage } from "./types";
import type { ReactNode } from "react";

type SupportChatMessageProps = {
  message: SupportMessage;
  onRetry?: () => void;
  children?: ReactNode;
};

export function SupportTypingIndicator() {
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

export function SupportChatMessage({ message, onRetry, children }: SupportChatMessageProps) {
  if (message.role === "system") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-[90%] rounded-2xl border border-dashed border-primary-green/30 bg-primary-green/5 px-4 py-3 text-center text-sm leading-relaxed text-gray-600 dark:text-gray-300"
      >
        {message.content}
      </motion.div>
    );
  }

  const isUser = message.role === "user";

  return (
    <motion.div
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
          {message.error && onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-2 text-xs font-semibold text-primary-green underline underline-offset-2"
            >
              Retry
            </button>
          )}
        </div>
        {children}
      </div>
    </motion.div>
  );
}
