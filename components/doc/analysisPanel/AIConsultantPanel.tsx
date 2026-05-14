"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FiMessageCircle } from "react-icons/fi";
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

export interface AIConsultantPanelProps {
  docData: Document;
}

export const AIConsultantPanel: React.FC<AIConsultantPanelProps> = ({ docData }) => {
  const dispatch = useDispatch();
  console.log("docData", docData);
  const { data, isPending } = useDocumentChat(docData.jobId);
  console.log("data", data, isPending);
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

  const handleSendMessage = () => {
    if (!chatInput.trim() || isLoading) return;

    const text = chatInput.trim();
    setChatInput("");
    dispatch(
      appendMessage({
        jobId: docData.jobId,
        message: {
          id: crypto.randomUUID(),
          role: "user",
          content: text,
          createdAt: new Date().toISOString(),
        },
      }),
    );
    setIsSending(true);

    apiClient
      .post<{ chatHistory?: DocumentChatMessage[] }>("/api/document/chat", {
        jobId: docData.jobId,
        inputText: text,
      })
      .then((res) => {
        const history = res.data?.chatHistory;
        console.log("history", history);
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
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-full flex bordser flex-col sm:max-h-[calc(100vh-20rem)] p-2 sm:p-4"
      >
        {!isPending && chatMessages.length > 0 && (
          <ChatMessages chatMessages={chatMessages} isSending={isSending} />
        )}
        {!isSending && !isPending && chatMessages.length == 0 && (
          <>
            <div className="text-center py-12">
              <FiMessageCircle className="text-gray-400 mx-auto mb-2" size={32} />
              <p className="text-gray-500 text-sm mb-1">Ask questions about this document</p>
              <p className="text-gray-400 text-xs">
                Get insights, explanations, and analysis powered by AI
              </p>
            </div>
          </>
        )}
        {isPending && (
          <>
            <div className="text-center py-12">
              <QlaretyLogo className="mx-auto animate-pulse" />
              <p className="text-gray-500 text-sm mb-1 mt-2">Fetching your chat history...</p>
              <p className="text-gray-400 text-xs">This may take a few seconds. Please wait.</p>
            </div>
          </>
        )}

        {
          <SpeechToTextInput
            value={chatInput}
            onChange={setChatInput}
            onSend={handleSendMessage}
            placeholder="Ask Qlarety about this document..."
            disabled={isLoading}
          />
        }
      </motion.div>
    </>
  );
};
