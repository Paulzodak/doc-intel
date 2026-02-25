"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiTrendingUp, FiCheckCircle, FiMessageCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import type { DocumentAnalysis } from "@/types/analysis";
import {
  setActiveTab,
  selectActiveTab,
  AnalysisPanelTab,
} from "@/redux/slices/dashboard/analysispanel.slice";
import type { Document } from "@/types/document";
import { GradingPanel } from "./GradingPanel";
import { AIConsultantPanel } from "./AIConsultantPanel";
import { DetailsPanel } from "./DetailsPanel";

export interface AnalysisPanelProps {
  analysis: DocumentAnalysis;
  documentSummary?: string;
  docData: Document;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis, docData }) => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);

  return (
    <div className="h-fudll sticky top-4 flex flex-col bg-white overflow-scroll border rounded-3xl">
      <div className="flex border-b border-gray-200 bg-white/80 sticsky tomp-0 z-10">
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

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {activeTab === "grading" && (
          <GradingPanel analysis={analysis} documentSummary={docData.documentSummary} />
        )}
        {activeTab === "chat" && <AIConsultantPanel docData={docData} />}
        {activeTab === "details" && <DetailsPanel analysis={analysis} />}
      </div>
    </div>
  );
};

export default AnalysisPanel;
