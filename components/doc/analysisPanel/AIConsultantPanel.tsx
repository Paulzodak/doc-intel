"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FiMessageCircle } from "react-icons/fi";
import { SpeechToTextInput } from "./SpeechToTextInput";
import { useDocumentChat } from "@/data/document/chat";
import type { Document, DocumentChatMessage } from "@/types/document";
import { apiClient } from "@/lib/axios";
import { selectMessagesForJob, setMessages } from "@/redux/slices/document/documentChat.slice";
import type { RootState } from "@/redux/store";

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

  const handleSendMessage = () => {
    if (!chatInput.trim() || isLoading) return;

    const text = chatInput.trim();
    setChatInput("");
    setIsSending(true);

    apiClient
      .post<{ chatHistory?: DocumentChatMessage[] }>("/api/document/chat", {
        jobId: docData.jobId,
        inputText: text,
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col sm:max-h-[calc(100vh-20rem)]"
    >
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0">
        {chatMessages.length === 0 ? (
          <div className="text-center py-12">
            <FiMessageCircle className="text-gray-400 mx-auto mb-2" size={32} />
            <p className="text-gray-500 text-sm mb-1">Ask questions about this document</p>
            <p className="text-gray-400 text-xs">
              Get insights, explanations, and analysis powered by AI
            </p>
          </div>
        ) : (
          chatMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-3 ${
                  message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </motion.div>
          ))
        )}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <SpeechToTextInput
        value={chatInput}
        onChange={setChatInput}
        onSend={handleSendMessage}
        placeholder="Ask Qlarety about this document..."
        disabled={isLoading}
      />
    </motion.div>
  );
};
