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
import {
  selectAnalysisPanelLocked,
  setAnalysisPanelLocked,
} from "@/redux/slices/document/documentAnalysis.slice";
import type { Document } from "@/types/document";
import { GradingPanel } from "./GradingPanel";
import { AIConsultantPanel } from "./AIConsultantPanel";
import { DetailsPanel } from "./DetailsPanel";
import { LockIcon } from "@/assets/svg/LockIcon";
import { GalleryIconFilled } from "@/assets/svg/GalleryIconFilled";
import { ExportButton } from "../ExportButton";
import { DownloadIcon } from "@/assets/svg/DownloadIcon";
import { ShareIcon } from "@/assets/svg/ShareIcon";

export interface AnalysisPanelProps {
  analysis: DocumentAnalysis;
  documentSummary?: string;
  docData: Document;
  className?: string;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis, docData, className }) => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const analysisPanelLocked = useSelector(selectAnalysisPanelLocked);

  return (
    <div
      className={` bg-white flex flex-col overflow-scroll border border-gray-200 lg:max-h-[40rem] lg:max-h-full rounded-2xl ${className}`}
    >
      {/* <button
        type="button"
        onClick={() => dispatch(setAnalysisPanelLocked(!analysisPanelLocked))}
        className="flex w-full items-center justify-center gap-2 py-1.5 border-b border-gray-200 text-gray-700 bg-gray-100/50 sm:hidden touch-manipulation"
      >
        <LockIcon className="shrink-0" size={16} />
        <span className="text-sm font-medium">{analysisPanelLocked ? "Locked" : "Unlocked"}</span>
      </button> */}
      <div className="flex border-b border-gray-200 bg-white/80">
        {[
          { id: "grading", label: "Grading", icon: FiTrendingUp },
          ...(!docData?.externalDocId
            ? [{ id: "chat", label: "AI Chat", icon: FiMessageCircle }]
            : []),
          { id: "details", label: "Details", icon: FiCheckCircle },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => dispatch(setActiveTab(tab.id as AnalysisPanelTab))}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors relative ${
              activeTab === tab.id ? "text-green-800" : "text-gray-600 hover:text-gray-900"
            } ${tab.id === "details" ? "lg:flex hidden" : ""}`}
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

      <div className="flex-1 overflow-scroll bordser border-red-800 smasx-h-[20rem]  px-2 sm:px-0 ">
        {activeTab === "grading" && (
          <GradingPanel analysis={analysis} documentSummary={docData.documentSummary} />
        )}
        {activeTab === "chat" && !docData.externalDocId && <AIConsultantPanel docData={docData} />}
        {activeTab === "details" && <DetailsPanel analysis={analysis} />}
      </div>
    </div>
  );
};

export default AnalysisPanel;
