"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { SpeechToTextInput } from "./SpeechToTextInput";
import { useDocumentChat } from "@/data/document/chat";
import type { Document, DocumentChatMessage } from "@/types/document";
import { apiClient } from "@/lib/axios";
import {
  appendMessage,
  selectMessagesForJob,
  setMessages,
} from "@/redux/slices/document/documentChat.slice";
import type { RootState } from "@/redux/store";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
import { ChatMessages } from "@/components/doc/analysisPanel/Chat/ChatMessages";

const SUGGESTED_PROMPTS = [
  "Summarize the key risks",
  "What are the payment terms?",
  "Any unusual liability clauses?",
  "Explain the termination section",
] as const;

export interface AIConsultantPanelProps {
  docData: Document;
}

export const AIConsultantPanel: React.FC<AIConsultantPanelProps> = ({ docData }) => {
  const dispatch = useDispatch();
  const { data, isPending } = useDocumentChat(docData.jobId);
  const chatMessages = useSelector((state: RootState) =>
    selectMessagesForJob(state, docData.jobId),
  );
  const [chatInput, setChatInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const isLoading = isPending || isSending;

  useEffect(() => {
    if (data?.data) {
      dispatch(setMessages({ jobId: docData.jobId, messages: data.data }));
    }
  }, [data, docData.jobId, dispatch]);

  const sendText = (text: string) => {
    if (!text.trim() || isLoading) return;

    setChatInput("");
    dispatch(
      appendMessage({
        jobId: docData.jobId,
        message: {
          id: crypto.randomUUID(),
          role: "user",
          content: text.trim(),
          createdAt: new Date().toISOString(),
        },
      }),
    );
    setIsSending(true);

    apiClient
      .post<{ chatHistory?: DocumentChatMessage[] }>("/api/document/chat", {
        jobId: docData.jobId,
        inputText: text.trim(),
      })
      .then((res) => {
        const history = res.data?.chatHistory;
        if (Array.isArray(history)) {
          dispatch(setMessages({ jobId: docData.jobId, messages: history }));
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const handleSendMessage = () => sendText(chatInput);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full min-h-[28rem] flex-col overflow-hidden rounded-2xl border border-[#1e2939]/8 bg-white/80 shadow-[0_16px_48px_rgba(17,22,31,0.06)] backdrop-blur-sm lg:max-h-[calc(100vh-20rem)] dark:border-white/10 dark:bg-[#0e131c]/80"
    >
      {/* Header */}
      <div className="relative flex items-center justify-between gap-3 border-b border-[#1e2939]/8 px-3 py-3 sm:px-4 dark:border-white/10">
        <div className="min-w-0">
          <p className="truncate font-lora text-base font-medium text-[#11161f] dark:text-white">
            Document assistant
          </p>
          <p className="truncate text-[11px] text-gray-500">Ask about clauses, risk, and meaning</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-green/25 bg-primary-green/10 px-2.5 py-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-green opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-green" />
          </span>
          <span className="text-[10px] font-semibold tracking-wide text-[#11161f] dark:text-white">
            Online
          </span>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-green/40 to-transparent"
        />
      </div>

      {/* Body */}
      <div className="flex min-h-0 flex-1 flex-col px-2 pt-1 sm:px-3">
        {isPending && (
          <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
            <QlaretyLogo className="mx-auto animate-pulse" width={56} height={56} shouldNavigate={false} />
            <p className="mt-3 text-sm text-gray-500">Fetching your chat history…</p>
            <p className="mt-1 text-xs text-gray-400">This may take a moment.</p>
          </div>
        )}

        {!isPending && chatMessages.length > 0 && (
          <ChatMessages chatMessages={chatMessages} isSending={isSending} />
        )}

        {!isSending && !isPending && chatMessages.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center px-3 py-8 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#11161f] ring-2 ring-primary-green/30">
              <QlaretyLogo width={28} height={28} shouldNavigate={false} />
            </div>
            <p className="font-lora text-lg font-medium text-[#11161f] dark:text-white">
              Ask about this document
            </p>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-gray-500">
              Risk, compliance, clauses, and plain-language explanations — grounded in what you
              uploaded.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {SUGGESTED_PROMPTS.map((prompt, index) => (
                <motion.button
                  key={prompt}
                  type="button"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  disabled={isLoading}
                  onClick={() => sendText(prompt)}
                  className="rounded-full border border-[#1e2939]/10 bg-white/90 px-3 py-1.5 text-[11px] font-medium text-[#11161f] shadow-sm transition-colors hover:border-primary-green/40 hover:bg-primary-green/10 disabled:opacity-50 dark:border-white/10 dark:bg-[#161c27] dark:text-white"
                >
                  {prompt}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="border-t border-[#1e2939]/8 bg-gradient-to-t from-white via-white/95 to-white/80 px-2 py-3 sm:px-3 dark:border-white/10 dark:from-[#0e131c] dark:via-[#0e131c]/95 dark:to-[#0e131c]/80">
        <SpeechToTextInput
          value={chatInput}
          onChange={setChatInput}
          onSend={handleSendMessage}
          placeholder="Ask Qlarety about this document…"
          disabled={isLoading}
        />
      </div>
    </motion.div>
  );
};
