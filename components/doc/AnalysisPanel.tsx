"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiTrendingUp,
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
  FiChevronDown,
  FiMessageCircle,
  FiSend,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import type { DocumentAnalysis } from "@/types/analysis";
import {
  setActiveTab,
  selectActiveTab,
  AnalysisPanelTab,
} from "@/redux/slices/dashboard/analysispanel.slice";
import { selectSelectedHighlight } from "@/redux/slices/document/documentContent.slice";

interface AnalysisPanelProps {
  analysis: DocumentAnalysis;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis }) => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);

  return (
    <div className="h-fudll flex flex-col bg-white overflow-scroll border rounded-3xl">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white/80  sticsky tomp-0 z-10">
        {[
          { id: "grading", label: "Grading", icon: FiTrendingUp },
          { id: "chat", label: "AI Chat", icon: FiMessageCircle },
          { id: "details", label: "Details", icon: FiCheckCircle },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => dispatch(setActiveTab(tab.id as AnalysisPanelTab))}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transitiodn-colors relative ${
              activeTab === tab.id ? "text-green-800" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <tab.icon size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-800"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {activeTab === "grading" && <GradingPanel analysis={analysis} />}
        {activeTab === "chat" && <AIConsultantPanel />}
        {activeTab === "details" && <DetailsPanel analysis={analysis} />}
      </div>
    </div>
  );
};

export default AnalysisPanel;

// Grading Panel Component
interface GradingPanelProps {
  analysis: DocumentAnalysis;
}

const GradingPanel: React.FC<GradingPanelProps> = ({ analysis }) => {
  const [isGradingExpanded, setIsGradingExpanded] = useState(true);
  const [isKeyPointsExpanded, setIsKeyPointsExpanded] = useState(true);

  // Calculate scores based on highlights
  const calculatedScores = useMemo(() => {
    const totalHighlights = analysis.highlights.length;

    if (totalHighlights === 0) {
      return {
        risk: 0,
        advantages: 0,
        compliance: 0,
        overall: 0,
      };
    }

    const riskCount = analysis.highlights.filter((h) => h.type === "risk").length;
    const advantageCount = analysis.highlights.filter((h) => h.type === "advantage").length;
    const complianceCount = analysis.highlights.filter((h) => h.type === "compliance").length;

    const risk = Math.round((riskCount / totalHighlights) * 100);
    const advantages = Math.round((advantageCount / totalHighlights) * 100);
    const compliance = Math.round((complianceCount / totalHighlights) * 100);

    // Overall score: lower risk is better, higher advantages and compliance are better
    // Formula: ((100 - risk) + advantages + compliance) / 3
    const overall = Math.round((100 - risk + advantages + compliance) / 3);

    return {
      risk,
      advantages,
      compliance,
      overall,
    };
  }, [analysis.highlights]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Grading Scores Collapsible Panel */}
      <CollapsiblePanel
        title="Grading Scores"
        isExpanded={isGradingExpanded}
        onToggle={() => setIsGradingExpanded(!isGradingExpanded)}
      >
        <GradingCard label="Risk Score" score={calculatedScores.risk} icon={FiAlertTriangle} />
        <GradingCard label="Advantages" score={calculatedScores.advantages} icon={FiCheckCircle} />
        <GradingCard label="Compliance" score={calculatedScores.compliance} icon={FiInfo} />

        {/* Overall Score */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-linear-to-b from-[#124F35] to-[#1D734B] rounded-xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium opacity-90">Overall Score</span>
            <span className="text-3xl font-bold">{calculatedScores.overall}/100</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${calculatedScores.overall}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </motion.div>
      </CollapsiblePanel>

      {/* Key Points Collapsible Panel */}
      {analysis.keyPoints.length > 0 && (
        <CollapsiblePanel
          title="Key Points"
          isExpanded={isKeyPointsExpanded}
          onToggle={() => setIsKeyPointsExpanded(!isKeyPointsExpanded)}
        >
          <ul className="space-y-2">
            {analysis.keyPoints.map((point, index) => (
              <li key={index} className="text-sm text-gray-700">
                <span className="font-semibold">• {point.text}:</span> {point.description}
              </li>
            ))}
          </ul>
        </CollapsiblePanel>
      )}
    </motion.div>
  );
};

// AI Consultant Panel Component
const AIConsultantPanel: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput.trim(),
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I understand you're asking about "${userMessage.content}". Based on the document analysis, I can provide insights about the risks, advantages, and compliance aspects. Would you like me to elaborate on any specific area?`,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col"
    >
      {/* Chat Messages */}
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

      {/* Chat Input */}
      <div className="flex gap-2 border-t border-gray-200 pt-4">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && chatInput.trim() && !isLoading) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Ask about this document..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={!chatInput.trim() || isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <FiSend size={16} />
        </button>
      </div>
    </motion.div>
  );
};

// Details Panel Component
interface DetailsPanelProps {
  analysis: DocumentAnalysis;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ analysis }) => {
  const selectedHighlight = useSelector(selectSelectedHighlight);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Selected Highlight Details */}
      {selectedHighlight ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-blue-400 shadow-lg"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiInfo className="text-blue-500" />
            Highlight Details
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase">Type</span>
              <p className="text-sm font-medium text-gray-900 capitalize mt-1">
                {selectedHighlight.type}
              </p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase">Text</span>
              <p className="text-sm text-gray-700 mt-1 bg-gray-50 p-2 rounded">
                {selectedHighlight.text}
              </p>
            </div>
            {selectedHighlight.description && (
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase">Description</span>
                <p className="text-sm text-gray-700 mt-1 bg-gray-50 p-2 rounded">
                  {selectedHighlight.description}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <FiInfo className="text-gray-400 mx-auto mb-2" size={32} />
          <p className="text-gray-500 text-sm">Select a highlight to view details</p>
        </div>
      )}
    </motion.div>
  );
};

// Collapsible Panel Component
interface CollapsiblePanelProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({
  title,
  isExpanded,
  onToggle,
  children,
}) => {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors"
      >
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FiChevronDown className="text-gray-600" size={20} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const GradingCard = ({
  label,
  score,
  icon: Icon,
}: {
  label: string;
  score: number;
  icon: React.ElementType;
}) => {
  const getGradingColor = (score: number) => {
    if (score >= 70) return { text: "text-green-600", bg: "bg-green-500", label: "Good" };
    if (score >= 40) return { text: "text-yellow-600", bg: "bg-yellow-500", label: "Fair" };
    return { text: "text-red-600", bg: "bg-red-500", label: "Poor" };
  };
  const colors = getGradingColor(score);
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className={colors.text} size={20} />
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
        <span className={`text-lg font-bold ${colors.text}`}>{score}/100</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full ${colors.bg} rounded-full`}
        />
      </div>
      <span className="text-xs text-gray-500 mt-1 block">{colors.label}</span>
    </motion.div>
  );
};
