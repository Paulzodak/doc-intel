"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMessageCircle } from "react-icons/fi";
import { SpeechToTextInput } from "./SpeechToTextInput";
import { useDocumentChat } from "@/data/document/chat";
import { Document, DocumentChatMessage, DocumentChatResponse } from "@/types/document";
import { apiClient } from "@/lib/axios";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface AIConsultantPanelProps {
  docData: Document;
}

export const AIConsultantPanel: React.FC<AIConsultantPanelProps> = ({ docData }) => {
  const { data, isPending, error } = useDocumentChat(docData.jobId);
  console.log(data, error);
  const [chatMessages, setChatMessages] = useState<DocumentChatMessage[]>(data?.data ?? []);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(isPending);

  const handleSendMessage = () => {
    if (!chatInput.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput.trim(),
      timestamp: new Date(),
    };

    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "user",
        content: chatInput.trim(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setChatInput("");
    setIsLoading(true);

    apiClient
      .post("/api/document/chat", {
        jobId: docData.jobId,
        inputText: chatInput.trim(),
      })
      .then((res) => {
        console.log(res);
        setChatMessages(res.data.chatHistory);
      })
      .catch((err) => {
        console.error(err);
      });

    // setTimeout(() => {
    //   const assistantMessage: ChatMessage = {
    //     id: (Date.now() + 1).toString(),
    //     role: "assistant",
    //     content: `I understand you're asking about "${userMessage.content}". Based on the document analysis, I can provide insights about the risks, advantages, and compliance aspects. Would you like me to elaborate on any specific area?`,
    //     timestamp: new Date(),
    //   };
    //   setChatMessages((prev) => [...prev, assistantMessage]);
    //   setIsLoading(false);
    // }, 1000);
  };

  React.useEffect(() => {
    setChatMessages(data?.data ?? []);
  }, [data]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col"
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
