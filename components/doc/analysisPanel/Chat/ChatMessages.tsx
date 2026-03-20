import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiMessageCircle } from "react-icons/fi";
import { Copy, Download } from "lucide-react";
import type { DocumentChatMessage } from "@/types/document";
import { ThumbsUpIcon } from "@/assets/svg/ThumbsUpIcon";
import { ThumbsDownIcon } from "@/assets/svg/ThumbsDownIcon";
import { DownloadIcon } from "@/assets/svg/DownloadIcon";
import { ExportResponseButton } from "@/components/doc/analysisPanel/Chat/ExportResponseButton";
export interface ChatMessagesProps {
  chatMessages: DocumentChatMessage[];
  isSending: boolean;
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

  return (
    <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto mb-4 min-h-0">
      <div className="min-h-full flex flex-col justify-end space-y-4">
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
              <div className="max-w-[85%]">
                <div
                  className={`rounded-lg p-3 ${
                    message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === "assistant" && (
                  <div className="mt-2 flex items-center gap-2 text-gray-500">
                    <button
                      type="button"
                      className="p-[5px] rounded hover:bg-gray-100 transition-colors"
                      aria-label="Copy"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      type="button"
                      className="p-[5px] rounded hover:bg-gray-100 transition-colors"
                      aria-label="Thumbs up"
                    >
                      <ThumbsUpIcon size={16} color="#6a7282" />
                    </button>
                    <button
                      type="button"
                      className="p-[5px] rounded hover:bg-gray-100 transition-colors"
                      aria-label="Thumbs down"
                    >
                      <ThumbsDownIcon size={16} color="#6a7282" />
                    </button>
                    <button
                      type="button"
                      className="p-[5px] rounded hover:bg-gray-100 transition-colors"
                      aria-label="Export"
                    >
                      <ExportResponseButton text={message.content} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
        {isSending && (
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
    </div>
  );
};
