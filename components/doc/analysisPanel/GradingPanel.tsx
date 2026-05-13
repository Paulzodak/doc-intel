"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FiAlertTriangle, FiCheckCircle, FiInfo } from "react-icons/fi";
import type { DocumentAnalysis } from "@/types/analysis";
import {
  selectIsGradingExpanded,
  selectIsKeyPointsExpanded,
  selectIsSummaryExpanded,
  setGradingExpanded,
  setKeyPointsExpanded,
  setSummaryExpanded,
} from "@/redux/slices/document/documentAnalysis.slice";
import { CollapsiblePanel } from "./CollapsiblePanel";
import { GradingCard } from "./GradingCard";
import { ShareIcon } from "@/assets/svg/ShareIcon";
import { GalleryIconFilled } from "@/assets/svg/GalleryIconFilled";

export interface GradingPanelProps {
  analysis: DocumentAnalysis;
  documentSummary?: string;
}

export const GradingPanel: React.FC<GradingPanelProps> = ({ analysis, documentSummary }) => {
  const dispatch = useDispatch();
  const isGradingExpanded = useSelector(selectIsGradingExpanded);
  const isKeyPointsExpanded = useSelector(selectIsKeyPointsExpanded);
  const isSummaryExpanded = useSelector(selectIsSummaryExpanded);

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
    const overall = Math.round((100 - risk + advantages + compliance) / 3);

    return {
      risk,
      advantages,
      compliance,
      overall,
    };
  }, [analysis.highlights]);

  console.log(documentSummary);
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 p-2 sm:p-4"
      >
        <CollapsiblePanel
          title="Summary"
          isExpanded={isSummaryExpanded}
          onToggle={() => dispatch(setSummaryExpanded(!isSummaryExpanded))}
        >
          {documentSummary ? (
            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {documentSummary}
            </p>
          ) : (
            <p className="text-sm text-gray-500 italic">No summary available for this document.</p>
          )}
        </CollapsiblePanel>

        <CollapsiblePanel
          title="Grading Scores"
          isExpanded={isGradingExpanded}
          onToggle={() => dispatch(setGradingExpanded(!isGradingExpanded))}
        >
          <GradingCard label="Risk Score" score={calculatedScores.risk} icon={FiAlertTriangle} />
          <GradingCard
            label="Advantages"
            score={calculatedScores.advantages}
            icon={FiCheckCircle}
          />
          <GradingCard label="Compliance" score={calculatedScores.compliance} icon={FiInfo} />

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

        {analysis.highlights.length > 0 && (
          <CollapsiblePanel
            title="Key Points"
            isExpanded={isKeyPointsExpanded}
            onToggle={() => dispatch(setKeyPointsExpanded(!isKeyPointsExpanded))}
          >
            <ul className="space-y-2">
              {analysis.highlights.map((highlight, index) => (
                <li key={index} className="text-sm text-gray-700">
                  {highlight.description && (
                    <span className="text-gray-600">• {highlight.description}</span>
                  )}
                </li>
              ))}
            </ul>
          </CollapsiblePanel>
        )}
      </motion.div>
      {/* <div className="border-t border-gray-100 bdg-gray-50  text-xs text-gray-500 p-4 sm:p-6 sm:px-8">
        <div className="flex items-center justdify-center gap-2 mb-4">
          <div className="uppercase">Share Analysis</div>
          <ShareIcon color="#6a7282" size={15} />
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="text-center">
            <button className="flex flex-col items-center gap-2 bg-green-700 borders p-5 rounded-full mx-auto mb-2 shadow-xl shadow-green-950/20">
              <GalleryIconFilled size={20} color="white" />
            </button>
            <span className="">Export as image</span>
          </div>
          <div className="text-center">
            <button className="flex flex-col items-center gap-2 bg-green-700 borders p-5 rounded-full mx-auto mb-2 shadow-xl shadow-green-950/20">
              <GalleryIconFilled size={20} color="white" />
            </button>
            <span className="">Export as image</span>
          </div>
          <div className="text-center">
            <button className="flex flex-col items-center gap-2 bg-green-700 borders p-5 rounded-full mx-auto mb-2 shadow-xl shadow-green-950/20">
              <GalleryIconFilled size={20} color="white" />
            </button>
            <span className="">Export as image</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};
