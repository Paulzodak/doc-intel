"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiTrendingUp, FiAlertTriangle, FiCheckCircle, FiInfo } from "react-icons/fi";
import type { DocumentAnalysis, Highlight } from "@/types/analysis";

interface AnalysisPanelProps {
  analysis: DocumentAnalysis;
  selectedHighlight: Highlight | null;
  onHighlightSelect?: (highlight: Highlight | null) => void;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({
  analysis,
  selectedHighlight,
  onHighlightSelect,
}) => {
  const [activeTab, setActiveTab] = useState<"grading" | "highlights" | "details">("grading");

  const getGradingColor = (score: number) => {
    if (score >= 70) return { text: "text-green-600", bg: "bg-green-500", label: "Good" };
    if (score >= 40) return { text: "text-yellow-600", bg: "bg-yellow-500", label: "Fair" };
    return { text: "text-red-600", bg: "bg-red-500", label: "Poor" };
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

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-white">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        {[
          { id: "grading", label: "Grading", icon: FiTrendingUp },
          { id: "highlights", label: "Highlights", icon: FiInfo },
          { id: "details", label: "Details", icon: FiCheckCircle },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "grading" | "highlights" | "details")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors relative ${
              activeTab === tab.id ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <tab.icon size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {activeTab === "grading" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <GradingCard label="Risk Score" score={analysis.grading.risk} icon={FiAlertTriangle} />
            <GradingCard
              label="Advantages"
              score={analysis.grading.advantages}
              icon={FiCheckCircle}
            />
            <GradingCard label="Compliance" score={analysis.grading.compliance} icon={FiInfo} />

            {/* Overall Score */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium opacity-90">Overall Score</span>
                <span className="text-3xl font-bold">{analysis.grading.overall}/100</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${analysis.grading.overall}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-white rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === "highlights" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {analysis.highlights.length > 0 ? (
              analysis.highlights.map((highlight, index) => {
                const typeColors = {
                  risk: "bg-red-100 border-red-300 text-red-900",
                  advantage: "bg-green-100 border-green-300 text-green-900",
                  compliance: "bg-yellow-100 border-yellow-300 text-yellow-900",
                };
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onHighlightSelect?.(highlight)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      selectedHighlight === highlight
                        ? `${typeColors[highlight.type]} ring-2 ring-blue-500`
                        : `${typeColors[highlight.type]} opacity-70 hover:opacity-100`
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{highlight.text}</p>
                        {highlight.description && (
                          <p className="text-xs mt-1 opacity-75 line-clamp-2">
                            {highlight.description}
                          </p>
                        )}
                      </div>
                      <span className="text-xs font-semibold capitalize flex-shrink-0">
                        {highlight.type}
                      </span>
                    </div>
                  </motion.button>
                );
              })
            ) : (
              <div className="text-center py-12">
                <FiInfo className="text-gray-400 mx-auto mb-2" size={32} />
                <p className="text-gray-500 text-sm">No highlights found</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "details" && (
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
                      <span className="text-xs font-semibold text-gray-500 uppercase">
                        Description
                      </span>
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

            {/* Key Points */}
            {analysis.keyPoints.length > 0 && (
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Key Points</h3>
                <ul className="space-y-2">
                  {analysis.keyPoints.map((point, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      <span className="font-semibold">• {point.text}:</span> {point.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AnalysisPanel;
