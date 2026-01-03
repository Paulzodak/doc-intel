"use client";
import React, { useState, useMemo } from "react";
import type { DocumentAnalysis, HighlightType, Highlight } from "@/types/analysis";

interface DocumentViewerProps {
  documentText: string;
  analysis: DocumentAnalysis;
  highlightType?: HighlightType;
  showPanel?: boolean;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  documentText,
  analysis,
  highlightType = "combined",
  showPanel = true,
}) => {
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(null);

  // Get highlights based on highlightType
  const activeHighlights = useMemo(() => {
    if (highlightType === "combined") {
      return analysis.highlights;
    }
    return analysis.highlights.filter((h) => h.type === highlightType);
  }, [analysis.highlights, highlightType]);

  console.log(activeHighlights);
  // Sort highlights by start position
  const sortedHighlights = useMemo(() => {
    return [...activeHighlights].sort((a, b) => a.start - b.start);
  }, [activeHighlights]);

  console.log(sortedHighlights);
  // Render text with highlights
  const renderHighlightedText = () => {
    if (sortedHighlights.length === 0) {
      return <p className="text-gray-800 whitespace-pre-wrap">{documentText}</p>;
    }

    // console.log(documentText);
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    sortedHighlights.forEach((highlight, index) => {
      // Add text before highlight
      if (highlight.start > lastIndex) {
        parts.push(
          <span key={`text-${index}`} className="text-gray-800">
            {documentText.substring(lastIndex, highlight.start)}
          </span>
        );
      }

      // Add highlighted text
      const highlightClass = {
        risk: "bg-red-100 text-red-900 border-b-2 border-red-400 cursor-pointer hover:bg-red-200",
        advantage:
          "bg-green-100 text-green-900 border-b-2 border-green-400 cursor-pointer hover:bg-green-200",
        compliance:
          "bg-yellow-100 text-yellow-900 border-b-2 border-yellow-400 cursor-pointer hover:bg-yellow-200",
      }[highlight.type];

      parts.push(
        <span
          key={`highlight-${index}`}
          className={highlightClass}
          onClick={() => setSelectedHighlight(highlight)}
          title={highlight.description || highlight.text}
        >
          {highlight.text}
        </span>
      );

      lastIndex = highlight.end;
    });
    // console.log(parts);
    // Add remaining text
    if (lastIndex < documentText.length) {
      parts.push(
        <span key="text-end" className="text-gray-800">
          {documentText.substring(lastIndex)}
        </span>
      );
    }

    return <p className="whitespace-pre-wrap leading-relaxed">{parts}</p>;
  };

  const getGradingColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 font-nunito">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Document View */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Document Viewer</h2>
                <div className="flex gap-2 flex-wrap">
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      highlightType === "combined"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => {}}
                  >
                    All Highlights
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      highlightType === "risk"
                        ? "bg-red-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => {}}
                  >
                    Risks
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      highlightType === "advantage"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => {}}
                  >
                    Advantages
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      highlightType === "compliance"
                        ? "bg-yellow-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => {}}
                  >
                    Compliance
                  </button>
                </div>
              </div>
              <div className="prose max-w-none border-t pt-6">{renderHighlightedText()}</div>
            </div>
          </div>

          {/* Side Panel */}
          {showPanel && (
            <div className="lg:col-span-1 space-y-6">
              {/* Grading Section */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Document Grading</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Risk Score</span>
                      <span
                        className={`text-sm font-bold ${getGradingColor(analysis.grading.risk)}`}
                      >
                        {analysis.grading.risk}/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          analysis.grading.risk >= 70
                            ? "bg-red-600"
                            : analysis.grading.risk >= 40
                            ? "bg-yellow-600"
                            : "bg-red-800"
                        }`}
                        style={{ width: `${analysis.grading.risk}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Advantages Score</span>
                      <span
                        className={`text-sm font-bold ${getGradingColor(
                          analysis.grading.advantages
                        )}`}
                      >
                        {analysis.grading.advantages}/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          analysis.grading.advantages >= 70
                            ? "bg-green-600"
                            : analysis.grading.advantages >= 40
                            ? "bg-yellow-600"
                            : "bg-red-600"
                        }`}
                        style={{ width: `${analysis.grading.advantages}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Compliance Score</span>
                      <span
                        className={`text-sm font-bold ${getGradingColor(
                          analysis.grading.compliance
                        )}`}
                      >
                        {analysis.grading.compliance}/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          analysis.grading.compliance >= 70
                            ? "bg-green-600"
                            : analysis.grading.compliance >= 40
                            ? "bg-yellow-600"
                            : "bg-red-600"
                        }`}
                        style={{ width: `${analysis.grading.compliance}%` }}
                      />
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-bold text-gray-900">Overall Score</span>
                      <span
                        className={`text-sm font-bold ${getGradingColor(analysis.grading.overall)}`}
                      >
                        {analysis.grading.overall}/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          analysis.grading.overall >= 70
                            ? "bg-green-600"
                            : analysis.grading.overall >= 40
                            ? "bg-yellow-600"
                            : "bg-red-600"
                        }`}
                        style={{ width: `${analysis.grading.overall}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Points */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Points</h3>
                <ul className="space-y-2">
                  {analysis.keyPoints.map((point, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      <span className="font-semibold">• {point.text}:</span> {point.description}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Risks */}
              {analysis.risks.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-red-900 mb-4">Identified Risks</h3>
                  <ul className="space-y-3">
                    {analysis.risks.map((risk, index) => (
                      <li key={index} className="text-sm">
                        <div className="flex items-start gap-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              risk.severity === "high"
                                ? "bg-red-600 text-white"
                                : risk.severity === "medium"
                                ? "bg-yellow-500 text-white"
                                : "bg-gray-400 text-white"
                            }`}
                          >
                            {risk.severity.toUpperCase()}
                          </span>
                          <div>
                            <span className="font-semibold text-gray-900">{risk.text}</span>
                            <p className="text-gray-600 mt-1">{risk.description}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Advantages */}
              {analysis.advantages.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-4">Advantages & Benefits</h3>
                  <ul className="space-y-2">
                    {analysis.advantages.map((advantage, index) => (
                      <li key={index} className="text-sm">
                        <span className="font-semibold text-gray-900">{advantage.text}:</span>
                        <span className="text-gray-600 ml-2">{advantage.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Selected Highlight Details */}
              {selectedHighlight && (
                <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-400">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Highlight Details</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-semibold text-gray-500 uppercase">Type:</span>
                      <span className="ml-2 text-sm font-medium capitalize">
                        {selectedHighlight.type}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-500 uppercase">Text:</span>
                      <p className="mt-1 text-sm text-gray-700">{selectedHighlight.text}</p>
                    </div>
                    {selectedHighlight.description && (
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase">
                          Description:
                        </span>
                        <p className="mt-1 text-sm text-gray-700">
                          {selectedHighlight.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
